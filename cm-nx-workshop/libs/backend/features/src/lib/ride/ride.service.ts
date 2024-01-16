/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository, Not, Any } from 'typeorm';
import { RideEntity } from './ride.entity';
import { ILocation, IRide, Status } from '@cm-nx-workshop/shared/api';
import { CarEntity } from '../car/car.entity';
import { LocationEntity } from '../location/location.entity';
import { CreateRideDto, UpdateRideDto } from '@cm-nx-workshop/backend/dto';
import { UserEntity } from '../user/user.entity';


@Injectable()
export class RideService {
  private readonly logger: Logger = new Logger(RideService.name);

  constructor(
    @InjectRepository(RideEntity)
    private readonly rideRepository: Repository<RideEntity>,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<IRide[]> {
    this.logger.log('Finding all rides');
    return this.rideRepository.find({
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation','passengers'],
    });
  }

  async findAllPending(): Promise<IRide[]> {
    this.logger.log('Finding all pending rides');
    return this.rideRepository.find({
      where: {
        status: Equal(Status.PENDING),
      },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation','passengers'],
    });
  }

  async findAllDriving(): Promise<IRide[]> {
    this.logger.log('Finding all driving rides');
    return this.rideRepository.find({
      where: {
        status: Equal(Status.DRIVING),
      },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation'],
    });
  }

  async findAllFinished(): Promise<IRide[]> {
    this.logger.log('Finding all finished rides');
    return this.rideRepository.find({
      where: {
        status: Equal(Status.FINISHED),
      },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation'],
    });
  }

  async findOne(id: string): Promise<IRide | null> {
    this.logger.log(`Finding ride with id ${id}`);
    const ride = await this.rideRepository.findOne({
      where: { id: id },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation','passengers'],
    });

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found`);
    }

    return ride;
  }

  validateRideForCurrentOrNextDay(ride: CreateRideDto): boolean {
    const currentDateTime = new Date();
    const departureDateTime = new Date(ride.departureTime);

    const endOfTomorrow = new Date(currentDateTime);
    endOfTomorrow.setDate(currentDateTime.getDate() + 1);
    endOfTomorrow.setHours(24, 59, 59, 999);

    this.logger.debug(
      `Validating ride: Departure DateTime - ${departureDateTime.toISOString()}, Current DateTime - ${currentDateTime.toISOString()}, End of Tomorrow - ${endOfTomorrow.toISOString()}`
    );

    const isValid =
      departureDateTime > currentDateTime && departureDateTime <= endOfTomorrow;

    if (!isValid) {
      this.logger.warn(
        `Ride validation failed: Departure datetime ${departureDateTime.toISOString()} is not allowed. It must be later than the current time and cannot be later than the end of tomorrow.`
      );
    }

    return isValid;
  }

  async createRideLocation(ride: CreateRideDto): Promise<ILocation> {
    if (
      !ride.arrivalLocation ||
      !ride.arrivalLocation.zipCode ||
      !ride.arrivalLocation.number
    ) {
      throw new ConflictException(
        'Location information is required to create a car'
      );
    }

    let location = await this.locationRepository.findOne({
      where: {
        zipCode: ride.arrivalLocation.zipCode,
        number: ride.arrivalLocation.number,
      },
    });

    if (!location) {
      this.logger.debug('Creating a new location');
      location = await this.locationRepository.save(
        this.locationRepository.create(ride.arrivalLocation)
      );
    }

    return location;
  }
  async create(ride: CreateRideDto): Promise<IRide | null> {
    this.logger.log(`Creating new ride: ${JSON.stringify(ride)}`);

    if (!this.validateRideForCurrentOrNextDay(ride)) {
      const currentDateTime = new Date();
      const departureDateTime = new Date(ride.departureTime);

      const endOfTomorrow = new Date(currentDateTime);
      endOfTomorrow.setDate(currentDateTime.getDate() + 1);
      endOfTomorrow.setHours(24, 59, 59, 999);

      this.logger.warn(
        `Invalid ride creation attempt. Current DateTime: ${currentDateTime.toISOString()}, Requested Departure DateTime: ${departureDateTime.toISOString()}`
      );
      throw new ConflictException(
        `Invalid departureTime: ${departureDateTime.toISOString()} is not within the allowed range (Today: ${currentDateTime.toISOString()}, Tomorrow: ${endOfTomorrow.toISOString()})`
      );
    }

    // Check if the vehicle exists and is available
    // const vehicle = await this.carRepository.findOne({
    //   where: { id: ride.vehicle.id },
    // });

    const vehicle = await this.carRepository.findOne({
      where: { id: ride.vehicle.id },
      select: [
        'id',
        'name',
        'plateNumber',
        'capacity',
        'mileage',
        'isAvailable',
        'location',
        'imageUrl',
      ],
      relations: ['location'],
    });

    if (!vehicle || !vehicle.isAvailable) {
      throw new ConflictException('Vehicle is not available for ride creation');
    }

    console.log('ride'+ vehicle.location.street)
    ride.vehicle = vehicle
    ride.departureLocation = vehicle.location
    ride.arrivalLocation = await this.createRideLocation(ride);
    console.log(ride)

    const newRide = await this.rideRepository.save(
      this.rideRepository.create(ride)
    );

    await this.carRepository.update(
      { id: newRide.vehicle.id },
      { isAvailable: false }
    );

    return this.findOne(newRide.id);
  }
  async update(id: string, updateRideDto: UpdateRideDto): Promise<IRide> {
    this.logger.log(`Updating ride with id ${id}`);
    const ride = await this.findOne(id);

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found`);
    }

    this.rideRepository.update(id, updateRideDto);
    return this.rideRepository.save(updateRideDto);
  }
  async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
    this.logger.log(`Deleting ride with id: ${id}`);

    const ride = await this.rideRepository.findOne({
      where: { id: id },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation','passengers'],
    });

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found`);
    }

    if(ride.passengers.length > 0){
      this.logger.warn(
        `Invalid ride deletion attempt. Ride has passengers`
      );
      throw new ConflictException(
        `Invalid ride deletion attempt. Ride has passengers`
      );
    }

    const result = await this.rideRepository.delete(id);

    if (result.affected === 0) {
      return { deleted: false, message: 'No ride found with that ID' };
    }

    return { deleted: true };
  }

  async finishRide(
    rideId: string,
    driverId: string,
    newMileage: number,
    arrivalTime: Date
  ): Promise<IRide> {
    this.logger.log(`Finishing ride with id: ${rideId}`);

    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
      relations: ['vehicle', 'driver', 'arrivalLocation'],
    });

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${rideId} not found`);
    }

    if (ride.status === Status.FINISHED) {
      throw new ConflictException('This ride has already been finished');
    }

    if (ride.driver.id !== driverId) {
      throw new UnauthorizedException(
        'Only the assigned driver can finish the ride'
      );
    }

    const arrivalDateTime =
      arrivalTime instanceof Date ? arrivalTime : new Date(arrivalTime);
    arrivalDateTime.setHours(arrivalDateTime.getHours()+1);
    const currentDateTime = new Date();

    // if (arrivalDateTime > currentDateTime) {
    //   throw new ConflictException('Arrival time cannot be in the future');
    // }

    ride.departureTime.setHours(ride.departureTime.getHours()+1);;

    // if (arrivalDateTime <= ride.departureTime) {
    //   throw new ConflictException(
    //     'Arrival time must be later than the departure time'
    //   );
    // }

    const vehicle = await this.carRepository.findOne({
      where: { id: ride.vehicle.id },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with ID ${ride.vehicle.id} not found`
      );
    }

    if (newMileage <= vehicle.mileage) {
      throw new ConflictException(
        'New mileage must be greater than the current vehicle mileage'
      );
    }

    // Update vehicle details
    const vehicleMileage = vehicle.mileage;
    vehicle.mileage = newMileage;
    vehicle.location = ride.arrivalLocation;
    vehicle.isAvailable = true;
    await this.carRepository.save(vehicle);

    // Update ride details
    ride.distance = newMileage - vehicleMileage;
    console.log(
      `newMileage: ${newMileage}  carMileageOld: ${vehicleMileage}  newCarMileage: ${vehicle.mileage} rideDistance: ${ride.distance}`
    );
    ride.status = Status.FINISHED;
    ride.arrivalTime = arrivalDateTime;
    await this.rideRepository.save(ride);

    return ride;
  }

  async joinRide(rideId: string, userId: string): Promise<IRide> {
    console.log('rideId'+rideId)
    console.log('userId'+userId)
    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
      relations: ['passengers', 'vehicle', 'driver'],
    });

    console.log('ride'+ride)
    if (!ride) {
      throw new NotFoundException(`Ride with ID ${rideId} not found`);
    }

    if (ride.driver.id === userId) {
      throw new ConflictException(
        `The driver of the ride cannot join as a passenger`
      );
    }

    if (!ride.isPublic) {
      throw new UnauthorizedException(
        'This ride is not public and cannot be joined'
      );
    }
    if (ride.status === Status.DRIVING) {
      throw new ConflictException('This ride is already on its way');
    }
    
    if (ride.passengers.some((passenger) => passenger.id === userId)) {
      throw new ConflictException(
        ` You are already a passenger of this ride`
      );
    }

    if (ride.status !== Status.PENDING) {
      throw new ConflictException(
        `Cannot join the ride because the departure time has already passed`
      );
    }

    if (ride.passengers.length >= ride.vehicle.capacity) {
      throw new ConflictException(
        `Ride has reached its capacity and cannot accept more passengers`
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    ride.passengers.push(user);
    await this.rideRepository.save(ride);
    return ride;
  }

  async unjoinRide(rideId: string, userId: string): Promise<IRide> {
    console.log('rideId'+userId)
    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation','passengers'],
    });

    console.log('ride'+ride)
    if (!ride) {
      throw new NotFoundException(`Ride with ID ${rideId} not found`);
    }
    if (ride.status === Status.DRIVING) {
      throw new ConflictException('This ride is already on its way');
    }
    const passengerIndex = ride.passengers.findIndex(
      (passenger) => passenger.id === userId
    );

    if (passengerIndex === -1) {
      throw new NotFoundException(
        `User with ID ${userId} is not a passenger of this ride`
      );
    }

    ride.passengers.splice(passengerIndex, 1);
    await this.rideRepository.save(ride);
    return ride;
  }

  async getRidesByUserId(userId: string): Promise<IRide[]> {
    this.logger.log(`Finding all rides for user with ID ${userId}`);

    const driverRides = await this.rideRepository.find({
      where: { driver: { id: userId } },
      relations: [
        'driver',
        'passengers',
        'vehicle',
        'departureLocation',
        'arrivalLocation',
      ],
    });

    const passengerRides = await this.rideRepository
      .createQueryBuilder('ride')
      .leftJoinAndSelect('ride.passengers', 'passenger')
      .leftJoinAndSelect('ride.driver', 'driver')
      .leftJoinAndSelect('ride.vehicle', 'vehicle')
      .leftJoinAndSelect('ride.departureLocation', 'departureLocation')
      .leftJoinAndSelect('ride.arrivalLocation', 'arrivalLocation')
      .where('passenger.id = :userId', { userId })
      .getMany();

    const combinedRides = [...driverRides, ...passengerRides].filter(
      (ride, index, self) => index === self.findIndex((r) => r.id === ride.id)
    );

    return combinedRides;
  }

  async updateStatus(rideId?: string): Promise<IRide> {
    const ride = await this.rideRepository.findOne({ where: { id: rideId } });

    if (!ride) {
      throw new Error(`Ride with ID ${rideId} not found`);
    }

    if (ride.status === Status.FINISHED) {
      return ride;
    }

    if (ride.status === Status.PENDING) {
      ride.status = Status.DRIVING;
      await this.rideRepository.save(ride);
    }

    return ride;
  }

  async getAvailableRides(userId: string): Promise<IRide[]> {

    const rides = await this.rideRepository.find({
      where: {
        status: Equal(Status.PENDING),
        driver: { id: Not(userId) },
        // passengers: {id: Not(userId)}
      },
      relations: [
        'driver',
        'passengers',
        'vehicle',
        'departureLocation',
        'arrivalLocation',
      ],
    });
    return rides;
  }
}

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
import { Repository } from 'typeorm';
import { RideEntity } from './ride.entity';
import { ILocation, IRide, Status } from '@cm-nx-workshop/shared/api';
import { CarEntity } from '../car/car.entity';
import { LocationEntity } from '../location/location.entity';
import { CreateRideDto, UpdateRideDto } from '@cm-nx-workshop/backend/dto';

@Injectable()
export class RideService {
  private readonly logger: Logger = new Logger(RideService.name);

  constructor(
    @InjectRepository(RideEntity)
    private readonly rideRepository: Repository<RideEntity>,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>
  ) {}

  async findAll(): Promise<IRide[]> {
    this.logger.log('Finding all rides');
    return this.rideRepository.find({
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation'],
    });
  }

  async findOne(id: string): Promise<IRide | null> {
    this.logger.log(`Finding ride with id ${id}`);
    const ride = await this.rideRepository.findOne({
      where: { id: id },
      relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation'],
    });

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found`);
    }

    return ride;
  }
  validateRide(ride: CreateRideDto): boolean {
    const currentDateTime = new Date();
    const departureDateTime = new Date(ride.departureTime);

    const tomorrow = new Date(currentDateTime);
    tomorrow.setDate(currentDateTime.getDate() + 1);

    this.logger.debug(
      `Validating ride: Departure DateTime - ${departureDateTime.toISOString()}, Current DateTime - ${currentDateTime.toISOString()}, Tomorrow - ${tomorrow.toISOString()}`
    );

    const isValid =
      (departureDateTime > currentDateTime &&
        departureDateTime.toDateString() === currentDateTime.toDateString()) ||
      departureDateTime.toDateString() === tomorrow.toDateString();

    if (!isValid) {
      this.logger.warn(
        `Ride validation failed: Departure datetime ${departureDateTime.toISOString()} is not allowed. It must be later than the current time if today or any time if tomorrow.`
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

    if (!this.validateRide(ride)) {
      const currentDateTime = new Date();
      const departureDateTime = new Date(ride.departureTime);

      const tomorrow = new Date(currentDateTime);
      tomorrow.setDate(currentDateTime.getDate() + 1);

      throw new ConflictException(
        `Invalid departureTime: ${departureDateTime.toISOString()} is not within the allowed range (Today: ${currentDateTime.toISOString()}, Tomorrow: ${tomorrow.toISOString()})`
      );
    }

    // Check if the vehicle exists and is available
    const vehicle = await this.carRepository.findOne({
      where: { id: ride.vehicle.id },
    });
    if (!vehicle || !vehicle.isAvailable) {
      throw new ConflictException('Vehicle is not available for ride creation');
    }

    ride.arrivalLocation = await this.createRideLocation(ride);

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

    if (ride.driver.id !== driverId) {
      throw new UnauthorizedException('Only the driver can finish the ride');
    }
    console.log(
      `arrivalTime: ${new Date(arrivalTime)} --> Ride arrivalTime ${
        ride.arrivalTime
      }`
    );
    if (new Date(arrivalTime) < ride.departureTime) {
      throw new ConflictException(
        'arrivalTime needs to be later than departureTime'
      );
    }
    let mileage = 0;
    const vehicle = await this.carRepository.findOne({
      where: { id: ride.vehicle.id },
    });
    if (vehicle) {
      if (newMileage < vehicle.mileage) {
        throw new ConflictException(
          'newMileage needs to be greater than vehicle mileage'
        );
      }
      mileage = vehicle.mileage;
      vehicle.mileage = newMileage;
      vehicle.location = ride.arrivalLocation;
      vehicle.isAvailable = true;
      await this.carRepository.save(vehicle);
    } else {
      throw new NotFoundException(`Vehicle with ID ${ride.vehicle} not found`);
    }
    ride.distance = newMileage - mileage;
    ride.status = Status.FINISHED;
    ride.arrivalTime = arrivalTime;
    await this.rideRepository.save(ride);
    return ride;
  }
}

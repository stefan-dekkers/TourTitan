// import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { RideEntity } from './ride.entity';
// import { IRide, Status } from '@cm-nx-workshop/shared/api';
// import { CreateRideDto, UpdateRideDto } from '@cm-nx-workshop/backend/dto';
// import { CarEntity } from '../car/car.entity';

import { Injectable } from "@nestjs/common";

@Injectable()
export class RideService {
  // private readonly logger: Logger = new Logger(RideService.name);

  // constructor(
  //   @InjectRepository(RideEntity)
  //   private readonly rideRepository: Repository<RideEntity>,
  //   @InjectRepository(CarEntity)
  //   private readonly carRepository: Repository<CarEntity>,
  // ) {}

  // async findAll(): Promise<IRide[]> {
  //   this.logger.log('Finding all rides');
  //   return this.rideRepository.find({
  //     relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation'], 
  //   });
  // }

  // async findOne(id: string): Promise<IRide | null> {
  //   this.logger.log(`Finding ride with id ${id}`);
  //   const ride = await this.rideRepository.findOne({ where: { id: id },
  //     relations: ['driver', 'vehicle', 'departureLocation', 'arrivalLocation'],
  // });

  //   if (!ride) {
  //     throw new NotFoundException(`Ride with ID ${id} not found`);
  //   }

  //   return ride;
  // }

  // async create(createRideDto: CreateRideDto): Promise<IRide> {
  //   this.logger.log('Creating new ride');
    
  //   const ride = this.rideRepository.create(createRideDto);
  //   return this.rideRepository.save(ride);
  // }

  // async update(id: string, updateRideDto: UpdateRideDto): Promise<IRide> {
  //   this.logger.log(`Updating ride with id ${id}`);
  //   const ride = await this.findOne(id); 

  //   if (!ride) {
  //     throw new NotFoundException(`Ride with ID ${id} not found`);
  //   }
    
  //    this.rideRepository.update(id, updateRideDto);
  //   return this.rideRepository.save(updateRideDto);
  // }

  // async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
  //   this.logger.log(`Deleting ride with id: ${id}`);
  //   const result = await this.rideRepository.delete(id);
  //   if (result.affected === 0) {
  //     return { deleted: false, message: 'No ride found with that ID' };
  //   }
  //   return { deleted: true };
  // }
  // async finishRide(rideId: string, driverId: string, distance: number): Promise<IRide> {
  //   this.logger.log(`Finishing ride with id: ${rideId}`);

  //   const ride = await this.rideRepository.findOne({
  //     where: { id: rideId },
  //     relations: ['vehicle', 'driver', 'arrivalLocation'],
  //   });

  //   if (!ride) {
  //     throw new NotFoundException(`Ride with ID ${rideId} not found`);
  //   }

  //   // Controleer of de gebruiker de bestuurder van de rit is
  //   if (ride.driver.id !== driverId) {
  //     throw new UnauthorizedException('Only the driver can finish the ride');
  //   }

  //   // Update de rit
  //   ride.distance = distance;
  //   ride.status = Status.FINISHED; // of de relevante status

  //   // Update de locatie van de auto naar de aankomstlocatie van de rit
  //   const vehicle = await this.carRepository.findOne({where : {id: ride.driver.id}});
  //   if (vehicle) {
  //     vehicle.mileage += distance;
  //     vehicle.location = ride.arrivalLocation; // Update de locatie van de auto
  //     await this.carRepository.save(vehicle);
  //   } else {
  //     throw new NotFoundException(`Vehicle with ID ${ride.vehicle.id} not found`);
  //   }

  //   await this.rideRepository.save(ride);
  //   return ride;
  // }
}


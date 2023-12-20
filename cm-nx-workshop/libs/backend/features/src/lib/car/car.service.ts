import { ICar } from '@cm-nx-workshop/shared/api';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './car.entity';
import { LocationEntity } from '../location/location.entity';
import { CreateCarDto, UpdateCarDto } from '@cm-nx-workshop/backend/dto';

@Injectable()
export class CarService {
  private readonly logger: Logger = new Logger(CarService.name);
  constructor(
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>
  ) {}
  async findAll(): Promise<ICar[]> {
    this.logger.log('Finding all cars');
    return this.carRepository.find({
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
  }

  async findOne(_id: string): Promise<ICar | null> {
    this.logger.log(`Finding car with id ${_id}`);
    return this.carRepository.findOne({
      where: { id: _id },
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
  }

  async create(car: CreateCarDto): Promise<ICar> {
    this.logger.log(`Creating car with plate number ${car.plateNumber}`);
    const existingCar = await this.carRepository.findOne({
      where: { plateNumber: car.plateNumber },
    });

    if (existingCar) {
      throw new ConflictException('Plate number already in use');
    }

   // Ensure that location information is provided
  if (!car.location || !car.location.zipCode || !car.location.number) {
    throw new ConflictException('Location information is required to create a car');
  }

  // Check if the location already exists
  const existingLocation = await this.locationRepository.findOne({
    where: { zipCode: car.location.zipCode, number: car.location.number },
  });

  if (existingLocation) {
    car.location = existingLocation;
  } else {
    // Create a new location if it doesn't exist
    const newLocation = this.locationRepository.create(car.location);
    car.location = await this.locationRepository.save(newLocation);
  }

  // Create the new car
  const newCar = this.carRepository.create(car);
  return this.carRepository.save(newCar);
}

async update(_id: string, carUpdate: UpdateCarDto): Promise<ICar | null> {
  this.logger.log(`Updating car with id ${_id}`);

  // Vind de auto die moet worden bijgewerkt
  const car = await this.carRepository.findOne({ where: { id: _id } });
  if (!car) {
      throw new NotFoundException(`Car with ID ${_id} not found`);
  }

  // Controleer of de nieuwe nummerplaat al in gebruik is (indien gewijzigd)
  if (carUpdate.plateNumber && car.plateNumber !== carUpdate.plateNumber) {
      const existingCar = await this.carRepository.findOne({
          where: { plateNumber: carUpdate.plateNumber },
      });
      if (existingCar) {
          throw new ConflictException('Plate number already in use');
      }
  }

  // Update locatie indien nodig
  if (carUpdate.location) {
      let locationToUpdate = await this.locationRepository.findOne({
          where: { zipCode: carUpdate.location.zipCode, number: carUpdate.location.number },
      });

      if (!locationToUpdate) {
          // Creëer een nieuwe locatie als deze niet bestaat
          locationToUpdate = this.locationRepository.create(carUpdate.location);
          await this.locationRepository.save(locationToUpdate);
      }
      
      // Update de locatie van de auto
      carUpdate.location = locationToUpdate;
  }

  // Voer de update uit
  await this.carRepository.update(_id, carUpdate);
  return this.findOne(_id);
}



async delete(_id: string): Promise<{ deleted: boolean; message?: string }> {
  this.logger.log(`Deleting car with id: ${_id}`);

  // Vind de auto en de locatie
  const car = await this.carRepository.findOne({ where: { id: _id }, relations: ['location'] });
  if (!car) {
      return { deleted: false, message: 'No car found with that ID' };
  }

  // Onthoud de locatie ID
  const locationId = car.location.id;

  // Verwijder de auto
  const result = await this.carRepository.delete(_id);
  if (result.affected === 0) {
      return { deleted: false, message: 'Error deleting car' };
  }

  // Controleer of er andere auto's zijn gekoppeld aan dezelfde locatie
  const otherCars = await this.carRepository.find({ where: { location: { id: locationId } } });
  if (otherCars.length === 0) {
      // Geen andere auto's, dus verwijder de locatie
      await this.locationRepository.delete(locationId);
  }

  return { deleted: true };
}

}

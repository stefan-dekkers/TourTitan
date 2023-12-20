import { ICar } from '@cm-nx-workshop/shared/api';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
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

    const existingLocation = await this.locationRepository.findOne({
      where: { zipCode: car.location.zipCode, number: car.location.number },
    });

    if (existingLocation) {
      car.location = existingLocation;
    } else {
      const newLocation = this.locationRepository.create(car.location);
      car.location = await this.locationRepository.save(newLocation);
    }

    const newCar = this.carRepository.create(car);
    return this.carRepository.save(newCar);
  }

  async update(_id: string, carUpdate: UpdateCarDto): Promise<ICar | null> {
    this.logger.log(`Updating car with id ${_id}`);
    await this.carRepository.update(_id, carUpdate);
    return this.carRepository.findOne({ where: { id: _id } });
  }

  async delete(_id: string): Promise<{ deleted: boolean; message?: string }> {
    this.logger.log(`Deleting car with id: ${_id}`);
    const result = await this.carRepository.delete(_id);
    if (result.affected === 0) {
      return { deleted: false, message: 'No car found with that ID' };
    }
    return { deleted: true };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarEntity } from './car.entity';
import { LocationEntity } from '../location/location.entity';
import { CreateCarDto } from '@cm-nx-workshop/backend/dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ICar } from '@cm-nx-workshop/shared/api';

describe('CarController', () => {
  let controller: CarController;
  let service: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        CarService,
        {
          provide: getRepositoryToken(CarEntity),
          useClass: CarEntity,
        },
        {
          provide: getRepositoryToken(LocationEntity),
          useClass: LocationEntity,
        },
      ],
    }).compile();

    controller = module.get<CarController>(CarController);
    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of cars', async () => {
      // Arrange
      const mockCars: ICar[] = [
        {
          id: '1',
          name: 'Car1',
          plateNumber: 'ABC123',
          capacity: 5,
          mileage: 10000,
          isAvailable: true,
          location: {
            zipCode: '1234XX',
            street: 'Streetname',
            city: 'Cityname',
            number: 4,
          },
          imageUrl: 'car1.jpg',
        },
        // Add more cars as needed...
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockCars);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(result).toEqual(mockCars);
    });
  });

  describe('getOne', () => {
    it('should return a single car by ID', async () => {
      // Arrange
      const mockCar: ICar = {
        id: '1',
        name: 'Car1',
        plateNumber: 'ABC123',
        capacity: 5,
        mileage: 10000,
        isAvailable: true,
        location: {
          zipCode: '1234XX',
          street: 'Streetname',
          city: 'Cityname',
          number: 4,
        },
        imageUrl: 'car1.jpg',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCar);

      // Act
      const result = await controller.getOne('1');

      // Assert
      expect(result).toEqual(mockCar);
    });
  });

  describe('create', () => {
    it('should create a new car', async () => {
      // Arrange
      const createCarDto: CreateCarDto = {
        name: 'NewCar',
        plateNumber: 'XYZ789',
        capacity: 4,
        mileage: 5000,
        isAvailable: true,
        location: {
          zipCode: '1234XX',
          street: 'Streetname',
          city: 'Cityname',
          number: 4,
        },
        imageUrl: 'newcar.jpg',
      };
      const createdCar: ICar = {
        id: '2',
        ...createCarDto,
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdCar);

      // Act
      const result = await controller.create(createCarDto);

      // Assert
      expect(result).toEqual(createdCar);
    });
  });

  describe('update', () => {
    it('should update an existing car', async () => {
      // Arrange
      const updateCarDto: ICar = {
        name: 'UpdatedCar',
        location: {
          zipCode: '1234XX',
          street: 'Streetname',
          city: 'Cityname',
          number: 4,
        },
        imageUrl: 'updatedcar.jpg',
        plateNumber: 'CM00CM',
        capacity: 4,
        mileage: 0,
        isAvailable: false,
      };
      const mockCar: ICar = {
        id: '1',
        name: 'Car1',
        plateNumber: 'ABC123',
        capacity: 5,
        mileage: 10000,
        isAvailable: true,
        location: {
          zipCode: '1234XX',
          street: 'Streetname',
          city: 'Cityname',
          number: 4,
        },
        imageUrl: 'car1.jpg',
      };
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...mockCar, ...updateCarDto });

      // Act
      const result = await service.update('1', updateCarDto);

      // Assert
      expect(result).toEqual({ ...mockCar, ...updateCarDto });
    });
  });

  describe('delete', () => {
    it('should delete an existing car', async () => {
      // Arrange
      jest.spyOn(service, 'delete').mockResolvedValue({ deleted: true });

      // Act
      const result = await controller.delete('1');

      // Assert
      expect(result).toEqual({ deleted: true });
    });
  });
});

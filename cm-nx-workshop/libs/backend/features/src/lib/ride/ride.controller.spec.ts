import { Test, TestingModule } from '@nestjs/testing';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { UserEntity } from '../user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RideEntity } from './ride.entity';
import { CarEntity } from '../car/car.entity';
import { LocationEntity } from '../location/location.entity';
import { Status, UserRole } from '@cm-nx-workshop/shared/api';

describe('RideController', () => {
  let controller: RideController;
  let service: RideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [
        RideService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserEntity,
        },
        {
          provide: getRepositoryToken(RideEntity),
          useClass: RideEntity,
        },
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

    controller = module.get<RideController>(RideController);
    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should get all rides', async () => {
      // Arrange
      const mockRides: RideEntity[] = [
        {
          id: '1',
          driver: {
            id: '20',
            name: 'Driver',
            emailAddress: 'Driver@test.com',
            password: 'Secret123',
            role: UserRole.Admin,
            drivenRides: [],
          },
          passengers: [
            {
              id: 'passenger1',
              name: 'Passenger',
              emailAddress: 'passenger@test.com',
              password: 'Secret111',
              role: UserRole.User,
              drivenRides: [],
            },
            {
              id: 'passenger2',
              name: 'PassengerToo',
              emailAddress: 'passengertoo@test.com',
              password: 'Secret222',
              role: UserRole.User,
              drivenRides: [],
            },
          ],
          vehicle: {
            id: 'car1',
            name: 'TestCar',
            plateNumber: 'TE00ST',
            capacity: 4,
            mileage: 1000,
            isAvailable: true,
            location: new LocationEntity(),
          },
          isPublic: true,
          status: Status.PENDING,
          departureLocation: {
            id: 'location1',
            city: 'Testcity',
            zipCode: '0000XX',
            street: 'Teststreet',
            number: 101,
            cars: [],
            arrivalLocation: [],
            departureLocation: [],
          },
          arrivalLocation: {
            id: 'location1',
            city: 'Testcity',
            zipCode: '1111XX',
            street: 'TestStreet',
            number: 202,
            cars: [],
            arrivalLocation: [],
            departureLocation: [],
          },
          departureTime: new Date('2024-01-15T12:00:00Z'),
          arrivalTime: new Date('2024-01-15T14:00:00Z'),
          distance: 50,
        },
        {
          id: '2',
          driver: {
            id: '21',
            name: 'AnotherDriver',
            emailAddress: 'anotherdriver@test.com',
            password: 'Secret456',
            role: UserRole.Admin,
            drivenRides: [],
          },
          passengers: [
            {
              id: 'passenger3',
              name: 'Passenger3',
              emailAddress: 'passenger3@test.com',
              password: 'Secret333',
              role: UserRole.User,
              drivenRides: [],
            },
          ],
          vehicle: {
            id: 'car2',
            name: 'AnotherCar',
            plateNumber: 'AC01BC',
            capacity: 5,
            mileage: 2000,
            isAvailable: false,
            location: new LocationEntity(),
          },
          isPublic: false,
          status: Status.FINISHED,
          departureLocation: {
            id: 'location3',
            city: 'NewCity',
            zipCode: '2222YY',
            street: 'NewStreet',
            number: 303,
            cars: [],
            arrivalLocation: [],
            departureLocation: [],
          },
          arrivalLocation: {
            id: 'location4',
            city: 'NewCity',
            zipCode: '3333ZZ',
            street: 'NewStreet',
            number: 404,
            cars: [],
            arrivalLocation: [],
            departureLocation: [],
          },
          departureTime: new Date('2024-01-16T10:00:00Z'),
          arrivalTime: new Date('2024-01-16T12:00:00Z'),
          distance: 75,
        },
        {
          id: '3',
          driver: {
            id: '22',
            name: 'NewDriver',
            emailAddress: 'newdriver@test.com',
            password: 'Secret789',
            role: UserRole.User,
            drivenRides: [],
          },
          passengers: [
            {
              id: 'passenger4',
              name: 'NewPassenger',
              emailAddress: 'newpassenger@test.com',
              password: 'Secret444',
              role: UserRole.User,
              drivenRides: [],
            },
          ],
          vehicle: {
            id: 'car3',
            name: 'NewCar',
            plateNumber: 'NC11DE',
            capacity: 3,
            mileage: 1500,
            isAvailable: true,
            location: new LocationEntity(),
          },
          isPublic: true,
          status: Status.PENDING,
          departureLocation: {
            id: 'location5',
            city: 'OtherCity',
            zipCode: '4444WW',
            street: 'OtherStreet',
            number: 505,
            cars: [],
            arrivalLocation: [],
            departureLocation: [],
          },
          arrivalLocation: {
            id: 'location6',
            city: 'OtherCity',
            zipCode: '5555XX',
            street: 'OtherStreet',
            number: 606,
            cars: [],
            arrivalLocation: [],
            departureLocation: [],
          },
          departureTime: new Date('2024-01-17T08:00:00Z'),
          arrivalTime: new Date('2024-01-17T10:00:00Z'),
          distance: 60,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockRides);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(result).toEqual(mockRides);
    });
  });

  describe('getOne', () => {
    it('should get one ride by id', async () => {
      // Arrange
      const rideId = '1';
      const mockRide: RideEntity = {
        id: '1',
        driver: {
          id: '20',
          name: 'Driver',
          emailAddress: 'Driver@test.com',
          password: 'Secret123',
          role: UserRole.Admin,
          drivenRides: [],
        },
        passengers: [
          {
            id: 'passenger1',
            name: 'Passenger',
            emailAddress: 'passenger@test.com',
            password: 'Secret111',
            role: UserRole.User,
            drivenRides: [],
          },
          {
            id: 'passenger2',
            name: 'PassengerToo',
            emailAddress: 'passengertoo@test.com',
            password: 'Secret222',
            role: UserRole.User,
            drivenRides: [],
          },
        ],
        vehicle: {
          id: 'car1',
          name: 'TestCar',
          plateNumber: 'TE00ST',
          capacity: 4,
          mileage: 1000,
          isAvailable: true,
          location: new LocationEntity(),
        },
        isPublic: true,
        status: Status.PENDING,
        departureLocation: {
          id: 'location1',
          city: 'Testcity',
          zipCode: '0000XX',
          street: 'Teststreet',
          number: 101,
          cars: [],
          arrivalLocation: [],
          departureLocation: [],
        },
        arrivalLocation: {
          id: 'location1',
          city: 'Testcity',
          zipCode: '1111XX',
          street: 'TestStreet',
          number: 202,
          cars: [],
          arrivalLocation: [],
          departureLocation: [],
        },
        departureTime: new Date('2024-01-15T12:00:00Z'),
        arrivalTime: new Date('2024-01-15T14:00:00Z'),
        distance: 50,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockRide);

      // Act
      const result = await controller.getOne(rideId);

      // Assert
      expect(result).toEqual(mockRide);
    });
  });
  describe('update', () => {
    it('should update the ride when it exists', async () => {
      // Arrange
      const rideId = '1';
      const updateRideDto = {
        id: '1',
        driver: {
          id: '20',
          name: 'newName',
          emailAddress: 'Driver2@test.com',
          password: 'Secret1232',
          role: UserRole.Admin,
          drivenRides: [],
        },
        passengers: [
          {
            id: 'passengers1',
            name: 'Passenger',
            emailAddress: 'passenger@test.com',
            password: 'Secret111',
            role: UserRole.User,
            drivenRides: [],
          },
          {
            id: 'passengers2',
            name: 'PassengerToo',
            emailAddress: 'passengertoo@test.com',
            password: 'Secret222',
            role: UserRole.User,
            drivenRides: [],
          },
        ],
        vehicle: {
          id: 'car1',
          name: 'TestCar',
          plateNumber: 'TE00ST',
          capacity: 4,
          mileage: 1000,
          isAvailable: true,
          location: new LocationEntity(),
        },
        isPublic: true,
        status: Status.PENDING,
        departureLocation: {
          id: 'location1',
          city: 'Testcity',
          zipCode: '0000XX',
          street: 'Teststreet',
          number: 101,
          cars: [],
          arrivalLocation: [],
          departureLocation: [],
        },
        arrivalLocation: {
          id: 'location1',
          city: 'Testcity',
          zipCode: '1111XX',
          street: 'TestStreet',
          number: 202,
          cars: [],
          arrivalLocation: [],
          departureLocation: [],
        },
        departureTime: new Date('2024-01-15T12:00:00Z'),
        arrivalTime: new Date('2024-01-15T14:00:00Z'),
        distance: 50,
      };
      const mockExistingRide = {
        id: '1',
        driver: {
          id: '20',
          name: 'Driver',
          emailAddress: 'Driver@test.com',
          password: 'Secret123',
          role: UserRole.Admin,
          drivenRides: [],
        },
        passengers: [
          {
            id: 'passenger1',
            name: 'Passenger',
            emailAddress: 'passenger@test.com',
            password: 'Secret111',
            role: UserRole.User,
            drivenRides: [],
          },
          {
            id: 'passenger2',
            name: 'PassengerToo',
            emailAddress: 'passengertoo@test.com',
            password: 'Secret222',
            role: UserRole.User,
            drivenRides: [],
          },
        ],
        vehicle: {
          id: 'car1',
          name: 'TestCar',
          plateNumber: 'TE00ST',
          capacity: 4,
          mileage: 1000,
          isAvailable: true,
          location: new LocationEntity(),
        },
        isPublic: true,
        status: Status.PENDING,
        departureLocation: {
          id: 'location1',
          city: 'Testcity',
          zipCode: '0000XX',
          street: 'Teststreet',
          number: 101,
          cars: [],
          arrivalLocation: [],
          departureLocation: [],
        },
        arrivalLocation: {
          id: 'location1',
          city: 'Testcity',
          zipCode: '1111XX',
          street: 'TestStreet',
          number: 202,
          cars: [],
          arrivalLocation: [],
          departureLocation: [],
        },
        departureTime: new Date('2024-01-15T12:00:00Z'),
        arrivalTime: new Date('2024-01-15T14:00:00Z'),
        distance: 50,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockExistingRide);
      jest.spyOn(service, 'update').mockResolvedValue(mockExistingRide);

      // Act
      await service.update(rideId, updateRideDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(rideId, updateRideDto);
      // Additional assertions based on your use case
    });
  });
  describe('delete', () => {
    it('should delete an existing ride', async () => {
      // Arrange
      const rideId = '1';
      const deleteResult = { deleted: true }; // Mocking the result of the delete operation
      jest.spyOn(service, 'delete').mockResolvedValue(deleteResult);

      // Act
      const result = await controller.delete(rideId);

      // Assert
      expect(result).toEqual({ deleted: true });
      expect(service.delete).toHaveBeenCalledWith(rideId);
    });
  });
});

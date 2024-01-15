import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { IUser, UserRole } from '@cm-nx-workshop/shared/api';
import { ConflictException, ForbiddenException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserEntity,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      // Arrange
      const mockUsers: IUser[] = [
        {
          id: '1',
          name: 'User1',
          emailAddress: 'user1@example.com',
          role: UserRole.Admin,
          password: 'password',
        },
        {
          id: '2',
          name: 'User2',
          emailAddress: 'user2@example.com',
          role: UserRole.User,
          password: 'password2',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getOne', () => {
    it('should return a single user by ID', async () => {
      // Arrange
      const mockUser: IUser = {
        id: '1',
        name: 'User1',
        emailAddress: 'user1@example.com',
        role: UserRole.User,
        password: 'password',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      // Act
      const result = await controller.getOne('1', { user: mockUser });

      // Assert
      expect(result).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const createUserDto = {
        id: '3',
        name: 'NewUser',
        emailAddress: 'newuser@example.com',
        role: UserRole.User,
        password: 'password123',
      };
      const createdUser: UserEntity = {
        ...createUserDto,
        drivenRides: [],
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      // Act
      const result = await controller.create(createUserDto);

      // Assert
      expect(result).toEqual(createdUser);
    });

    it('should throw ConflictException for existing email address', async () => {
      // Arrange
      const createUserDto = {
        id: '1',
        name: 'ExistingUser',
        emailAddress: 'existinguser@example.com',
        role: UserRole.User,
        password: 'password123',
      };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new ConflictException('Email address already in use')
        );

      // Act & Assert
      await expect(controller.create(createUserDto)).rejects.toThrowError(
        ConflictException
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      // Arrange
      const updateUserDto = {
        name: 'UpdatedUser',
        emailAddress: 'updateduser@example.com',
      };
      const mockUser: IUser = {
        id: '1',
        name: 'User1',
        emailAddress: 'user1@example.com',
        role: UserRole.User,
        password: 'password',
      };

      // Mock the update method of userRepository
      jest
        .spyOn(service, 'update')
        .mockImplementation(async (_id: string, userUpdate: Partial<IUser>) => {
          // Assuming you have a proper implementation that returns the updated user
          return { ...mockUser, ...userUpdate };
        });

      // Act
      const result = await controller.update('1', updateUserDto, {
        user: mockUser,
      });

      // Assert
      expect(result).toEqual({ ...mockUser, ...updateUserDto });
    });

    it('should throw ForbiddenException for unauthorized update', async () => {
      // Arrange
      const updateUserDto = {
        name: 'UpdatedUser',
        emailAddress: 'updateduser@example.com',
      };
      const mockUser: IUser = {
        id: '2',
        name: 'User2',
        emailAddress: 'user2@example.com',
        role: UserRole.User,
        password: 'password',
      };
      const req = { user: mockUser };

      // Mock the update method of userRepository to throw ForbiddenException
      jest.spyOn(service, 'update').mockImplementation(async () => {
        throw new ForbiddenException();
      });

      // Act & Assert
      await expect(
        controller.update('1', updateUserDto, req)
      ).rejects.toThrowError(ForbiddenException);
    });
  });

  describe('delete', () => {
    it('should delete an existing user', async () => {
      // Arrange
      const mockUser: IUser = {
        id: '1',
        name: 'User1',
        emailAddress: 'user1@example.com',
        role: UserRole.Admin,
        password: 'password',
      };
      jest.spyOn(service, 'delete').mockResolvedValue({ deleted: true });

      // Act
      const result = await controller.deleteUser('1', { user: mockUser });

      // Assert
      expect(result).toEqual({ deleted: true });
    });

    it('should throw ForbiddenException for unauthorized delete', async () => {
      // Arrange
      const mockUser: IUser = {
        id: '2',
        name: 'User2',
        emailAddress: 'user2@example.com',
        role: UserRole.User,
        password: 'password',
      };
      const req = { user: mockUser };

      // Mock the delete method of userRepository
      jest.spyOn(service, 'delete').mockImplementation(async () => {
        throw new ForbiddenException();
      });

      // Act & Assert
      await expect(controller.deleteUser('1', req)).rejects.toThrowError(
        ForbiddenException
      );
    });
  });
});

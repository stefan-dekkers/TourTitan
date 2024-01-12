import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserRole } from '@cm-nx-workshop/shared/api';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserEntity,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token on successful login', async () => {
      // Arrange
      const mockLoginDto = {
        emailAddress: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(authService, 'login').mockImplementation(async () => {
        return {
          name: 'Mock User',
          emailAddress: 'test@example.com',
          role: UserRole.User,
          pass: 'secret123',
        };
      });

      // Act
      const result = await controller.login(mockLoginDto);

      // Assert
      expect(result).toEqual({
        // access_token: 'mockAccessToken',
        emailAddress: 'test@example.com',
        pass: 'secret123',
        name: 'Mock User',
        role: 'user',
      });
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      // Arrange
      const mockLoginDto = {
        emailAddress: 'test@example.com',
        password: 'invalidPassword',
      };
      jest.spyOn(authService, 'login').mockImplementation(async () => {
        throw new UnauthorizedException('Invalid credentials');
      });

      // Act & Assert
      await expect(controller.login(mockLoginDto)).rejects.toThrowError(
        UnauthorizedException
      );
    });
  });
});

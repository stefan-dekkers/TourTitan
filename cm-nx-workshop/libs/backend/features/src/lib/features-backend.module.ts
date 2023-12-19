import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController, UserController, CarController],
  providers: [UserService, AuthService, CarService],
  exports: [UserService, AuthService, CarService],
})
export class FeaturesBackendModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { CarEntity } from './car/car.entity';
import { LocationEntity } from './location/location.entity';
import { RideController } from './ride/ride.controller';
import { RideService } from './ride/ride.service';
import { RideEntity } from './ride/ride.entity';


@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([UserEntity, CarEntity, LocationEntity,RideEntity]),
  ],
  controllers: [AuthController, UserController, CarController,RideController],
  providers: [UserService, AuthService, CarService,RideService],
  exports: [UserService, AuthService, CarService,RideService],
})
export class FeaturesBackendModule {}

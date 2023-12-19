import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '60m' },
  }),TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController, UserController],
  providers: [UserService,AuthService],
  exports: [UserService,AuthService],
})
export class FeaturesBackendModule {}

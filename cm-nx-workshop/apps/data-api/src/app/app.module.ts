import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesBackendModule } from './../../../../libs/backend/features/src/lib/features-backend.module';
import { Module } from '@nestjs/common';
import { UserEntity } from 'libs/backend/features/src/lib/user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarEntity } from 'libs/backend/features/src/lib/car/car.entity';
import { LocationEntity } from 'libs/backend/features/src/lib/location/location.entity';
@Module({
  imports: [
    FeaturesBackendModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [UserEntity, CarEntity, LocationEntity],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
        options: {
          trustServerCertificate:
            configService.get<string>('DATABASE_TRUST_SERVER_CERTIFICATE') ===
            'true',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

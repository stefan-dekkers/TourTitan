import { FeaturesBackendModule } from './../../../../libs/backend/features/src/lib/features-backend.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [FeaturesBackendModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

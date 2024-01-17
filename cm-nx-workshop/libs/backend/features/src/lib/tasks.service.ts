import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RideService } from './ride/ride.service';
import { Status } from '@cm-nx-workshop/shared/api';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly rideService: RideService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkAndUpdateRideStatuses() {
    this.logger.debug('Checking and updating ride statuses...');

    const currentDateTime = new Date();
    const utcCurrentDateTime = new Date(
      currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000
    );
    this.logger.debug(
      `Current UTC DateTime: ${utcCurrentDateTime.toISOString()}`
    );

    const rides = await this.rideService.findAllPending();

    this.logger.debug(`Found ${rides.length} rides to check.`);

    for (const ride of rides) {
      const departureDateTime = new Date(ride.departureTime);
      this.logger.debug(
        `Departure UTC DateTime: ${departureDateTime.toISOString()}`
      );

      if (
        departureDateTime <= utcCurrentDateTime &&
        ride.status === Status.PENDING
      ) {
        this.logger.debug(`Updating status of ride with ID: ${ride.id}`);
        await this.rideService.updateStatus(ride.id);
        this.logger.debug(`Updated status of ride with ID: ${ride.id}`);
      } else {
        this.logger.debug(`No update needed for ride with ID: ${ride.id}`);
      }
    }
  }
}

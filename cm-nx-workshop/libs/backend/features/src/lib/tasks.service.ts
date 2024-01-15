import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RideService } from './ride/ride.service';
import { Status } from '@cm-nx-workshop/shared/api';

@Injectable()
export class TasksService {
  constructor(private readonly rideService: RideService) {}
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_MINUTE)
  async checkAndUpdateRideStatuses() {
    this.logger.debug('Checking and updating ride statuses...');

    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 1);

    // console.log(currentDateTime);

    const rides = await this.rideService.findAll();
    for (const ride of rides) {
      const departureDateTime = new Date(ride.departureTime);

      // console.log(departureDateTime);
      // console.log(
      //   departureDateTime <= currentDateTime && ride.status === Status.PENDING
      // );

      if (
        departureDateTime <= currentDateTime &&
        ride.status === Status.PENDING
      ) {
        await this.rideService.updateStatus(ride.id);
      }
    }
  }
}

// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     Post,
//     Put,
//     Patch,
//     UnauthorizedException,
//   } from '@nestjs/common';
//   import { RideService } from './ride.service';
//   import { CreateRideDto, UpdateRideDto } from '@cm-nx-workshop/backend/dto';
//   import { IRide } from '@cm-nx-workshop/shared/api';
  
//   @Controller('ride')
//   export class RideController {
//     constructor(private rideService: RideService) {}
  
//     @Get('')
//     getAll(): Promise<IRide[]> {
//       return this.rideService.findAll();
//     }
  
//     @Get(':id')
//     getOne(@Param('id') id: string): Promise<IRide | null> {
//       return this.rideService.findOne(id);
//     }
  
//     @Post('')
//     async create(@Body() data: CreateRideDto): Promise<IRide> {
//       return this.rideService.create(data);
//     }
  
//     @Put(':id')
//     async update(
//       @Param('id') id: string,
//       @Body() data: UpdateRideDto
//     ): Promise<IRide | null> {
//       return this.rideService.update(id, data);
//     }
  
//     @Patch(':id/finish')
//     async finish(
//       @Param('id') id: string,
//       @Body('driverId') driverId: string,
//       @Body('distance') distance: number
//     ): Promise<IRide> {
//         const finishedRide = await this.rideService.findOne(id);
//         if (!finishedRide) {
//             throw new Error(`Could not find ride with id ${id}`);
//         }
//         if (driverId !== finishedRide.driverId) {
//             throw new UnauthorizedException('You are not authorized to finish this ride');
//             }
//       return this.rideService.finishRide(id, driverId, distance);
//     }
  
//     @Delete(':id')
//     async delete(@Param('id') id: string): Promise<{ deleted: boolean; message?: string }> {
//       return this.rideService.delete(id);
//     }
// }
  
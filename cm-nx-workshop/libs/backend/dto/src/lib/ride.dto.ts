// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsBoolean, IsEnum, IsDate, ValidateNested, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ICar, IRide, IUpdateRide, Status } from '@cm-nx-workshop/shared/api';
// import { IUser } from '@cm-nx-workshop/shared/api';
// import { ILocation } from '@cm-nx-workshop/shared/api';
// import { CreateUserDto } from './user.dto';
// import { CreateCarDto } from './car.dto';

// export class CreateRideDto implements IRide{

//   id!: string;
 
//   @ApiProperty({ example: 'Scenic Mountain Ride', description: 'The name of the ride' })
//   @IsNotEmpty()
//   name!: string;

//   @ApiProperty({ description: 'The driver of the ride', type: () => CreateUserDto })
//   @ValidateNested()
//   @Type(() => CreateUserDto)
//   driver!: IUser;

//   @ApiProperty({ description: 'The passengers of the ride', type: () => CreateUserDto })
//   @ValidateNested()
//   passengers!: IUser[];

//   @ApiProperty({ description: 'The vehicle of the ride', type: () => CreateCarDto })
//   @ValidateNested()
//   @Type(() => CreateCarDto)
//   vehicle!: ICar;

//   @ApiProperty({ example: true, description: 'Whether the ride is public or private' })
//   @IsNotEmpty()
//   @IsBoolean()
//   isPublic!: boolean;

//   @ApiProperty({ enum: Status, description: 'The status of the ride' })
//   @IsEnum(Status)
//   status!: Status;

//   @ApiProperty({ description: 'The departure location of the ride'})
//   @ValidateNested()
//   departureLocation!: ILocation;

//   @ApiProperty({ description: 'The arrival location of the ride'})
//   @ValidateNested()
//   arrivalLocation!: ILocation;

//   @ApiProperty({ example: '2023-12-25T10:00:00.000Z', description: 'The departure time of the ride', type: 'string', format: 'date-time' })
//   @IsNotEmpty()
//   @Type(() => Date)
//   @IsDate()
//   departureTime!: Date;

//   @ApiProperty({ example: '2023-12-25T12:00:00.000Z', description: 'The arrival time of the ride', type: 'string', format: 'date-time' })
//   @Type(() => Date)
//   @IsDate()
//   arrivalTime!: Date;

//   @ApiProperty({ example: 100, description: 'The distance of the ride in kilometers' })
//   @IsNotEmpty()
//   distance!: number;
// }
// export class UpdateRideDto implements IUpdateRide{
//     @ApiProperty({ example: 'Scenic Mountain Ride', description: 'The name of the ride' })
//     @IsNotEmpty()
//     @IsOptional()
//     name?: string;
  
//     @ApiProperty({ description: 'The driver of the ride', type: () => CreateUserDto })
//     @ValidateNested()
//     @Type(() => CreateUserDto)
//     @IsOptional()
//     driver?: IUser;
  
//     @ApiProperty({ description: 'The passengers of the ride', type: () => CreateUserDto })
//     @ValidateNested()
//     @IsOptional()
//     passengers?: IUser[];
  
//     @ApiProperty({ description: 'The vehicle of the ride', type: () => CreateCarDto })
//     @ValidateNested()
//     @Type(() => CreateCarDto)
//     @IsOptional()
//     vehicle?: ICar;
  
//     @ApiProperty({ example: true, description: 'Whether the ride is public or private' })
//     @IsNotEmpty()
//     @IsBoolean()
//     @IsOptional()
//     isPublic?: boolean;
  
//     @ApiProperty({ enum: Status, description: 'The status of the ride' })
//     @IsEnum(Status)
//     @IsOptional()
//     status?: Status;
  
//     @ApiProperty({ description: 'The departure location of the ride'})
//     @ValidateNested()
//     @IsOptional()
//     departureLocation?: ILocation;
  
//     @ApiProperty({ description: 'The arrival location of the ride'})
//     @ValidateNested()
//     @IsOptional()
//     arrivalLocation?: ILocation;
  
//     @ApiProperty({ example: '2023-12-25T10:00:00.000Z', description: 'The departure time of the ride', type: 'string', format: 'date-time' })
//     @IsNotEmpty()
//     @Type(() => Date)
//     @IsDate()
//     @IsOptional()
//     departureTime?: Date;
  
//     @ApiProperty({ example: '2023-12-25T12:00:00.000Z', description: 'The arrival time of the ride', type: 'string', format: 'date-time' })
//     @Type(() => Date)
//     @IsDate()
//     @IsOptional()
//     arrivalTime?: Date;
  
//     @ApiProperty({ example: 100, description: 'The distance of the ride in kilometers' })
//     @IsNotEmpty()
//     @IsOptional()
//     distance?: number;
//   }
  
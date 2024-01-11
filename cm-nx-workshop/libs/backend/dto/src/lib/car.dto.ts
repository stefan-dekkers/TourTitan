import {
  ICreateCar,
  ILocation,
  IUpdateCar,
} from '@cm-nx-workshop/shared/api';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCarDto implements ICreateCar {
  @ApiProperty({ example: 'CruiseMobile', description: 'The name of the car' })
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ApiProperty({
    example: '01-CB-OL',
    description: 'The numberplate of the car',
  })
  @IsNotEmpty()
  @IsString()
  plateNumber!: string;

  @ApiProperty({
    example: '4',
    description: 'The amount of people that fit in the car',
  })
  @IsNumber()
  @IsNotEmpty()
  capacity!: number;

  @ApiProperty({ example: '10000', description: 'The mileage of the car' })
  @IsNumber()
  @IsNotEmpty()
  mileage!: number;

  @ApiProperty({ example: 'true', description: 'The availability of the car' })
  @IsNotEmpty()
  isAvailable!: boolean;

  @ApiProperty({
    example: 'https://afejidzuen.cloudimg.io/v7/https://s3.eu-central-1.amazonaws.com/pouw-nl/04/volkswagen-polo-gti-2021-3.jpg?v=1-0&width=980&height=653',
    description: 'The image of the car',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @ApiProperty({
    example: 'Breda Office',
    description: 'The location of the car',
  })
  @IsNotEmpty()
  location!: ILocation;
}

export class UpdateCarDto implements IUpdateCar {
  @ApiPropertyOptional({
    example: 'CruiseMobile',
    description: 'The name of the car',
  })
  @IsOptional()
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: '01-CB-OL',
    description: 'The numberplate of the car',
  })
  @IsOptional()
  @IsString()
  plateNumber!: string;

  @ApiPropertyOptional({
    example: '4',
    description: 'The amount of people that fit in the car',
  })
  @IsNumber()
  @IsOptional()
  capacity!: number;

  @ApiProperty({
    example: 'https://afejidzuen.cloudimg.io/v7/https://s3.eu-central-1.amazonaws.com/pouw-nl/04/volkswagen-polo-gti-2021-3.jpg?v=1-0&width=980&height=653',
    description: 'The image of the car',
  })
  @IsString()
  @IsOptional()
  imageUrl!: string;

  @ApiPropertyOptional({
    example: '0',
    description: 'The location id of the car',
  })
  @IsOptional()
  location!: ILocation;
}

import { ICreateCar, IUpdateCar } from "@cm-nx-workshop/shared/api";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
  } from 'class-validator';

export class CreateCarDto implements ICreateCar{
    @ApiProperty({ example: 'CruiseMobile', description: 'The name of the car' })
    @IsNotEmpty()
    @IsString()
    name!: string;
    @ApiProperty({ example: '01-CB-OL', description: 'The numberplate of the car' })
    @IsNotEmpty()
    @IsString()
    plateNumber!: string;
    @ApiProperty({ example: '4', description: 'The amount of people that fit in the car' })
    @IsNumber()
    @IsNotEmpty()
    capacity!: number;
    @ApiProperty({ example: 'Breda Office', description: 'The location of the car' })
    @IsNotEmpty()
    @IsString()
    location!: string;
    
}

export class UpdateCarDto implements IUpdateCar{
    @ApiPropertyOptional({ example: 'CruiseMobile', description: 'The name of the car' })
    @IsOptional()
    @IsString()
    name!: string;
    @ApiPropertyOptional({ example: '01-CB-OL', description: 'The numberplate of the car' })
    @IsOptional()
    @IsString()
    plateNumber!: string;
    @ApiPropertyOptional({ example: '4', description: 'The amount of people that fit in the car' })
    @IsNumber()
    @IsOptional()
    capacity!: number;
    @ApiPropertyOptional({ example: 'Breda Office', description: 'The location of the car' })
    @IsOptional()
    @IsString()
    location!: string;
}
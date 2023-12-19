import { ICreateLocation } from "@cm-nx-workshop/shared/api";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
  } from 'class-validator';

export class CreateLocationDto implements ICreateLocation{
    @ApiProperty({ example: 'Breda head office', description: 'The name of the location' })
    @IsNotEmpty()
    @IsString()
    name!: string;
    @ApiProperty({ example: '4352RD', description: 'The zipcode of the location' })
    @IsNotEmpty()
    @IsString()
    zipCode!: string;
    @ApiProperty({ example: 'Bredaweg', description: 'The street of the location' })
    @IsNotEmpty()
    @IsString()
    street!: string;
    @ApiProperty({ example: '135', description: 'The house number of the location' })
    @IsNumber()
    @IsNotEmpty()
    number!: number;
}
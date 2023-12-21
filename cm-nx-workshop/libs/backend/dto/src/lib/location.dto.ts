import { ICreateLocation } from '@cm-nx-workshop/shared/api';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLocationDto implements ICreateLocation {
  @ApiProperty({ example: 'Breda', description: 'The city of the location' })
  @IsNotEmpty()
  @IsString()
  city!: string;
  @ApiProperty({
    example: '4352RD',
    description: 'The zipcode of the location',
  })
  @IsNotEmpty()
  @IsString()
  zipCode!: string;
  @ApiProperty({
    example: 'Bredaweg',
    description: 'The street of the location',
  })
  @IsNotEmpty()
  @IsString()
  street!: string;
  @ApiProperty({
    example: '135',
    description: 'The house number of the location',
  })
  @IsNumber()
  @IsNotEmpty()
  number!: number;
}

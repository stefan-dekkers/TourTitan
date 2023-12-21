import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CarService } from './car.service';
import { ICar } from '@cm-nx-workshop/shared/api';
import { CreateCarDto, UpdateCarDto } from '@cm-nx-workshop/backend/dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get('')
  getAll(): Promise<ICar[]> {
    return this.carService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ICar | null> {
    return this.carService.findOne(id);
  }

  @Post('')
  async create(@Body() data: CreateCarDto): Promise<ICar> {
    return this.carService.create(data);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateCarDto,
    @Param('id') id: string
  ): Promise<ICar | null> {
    return this.carService.update(id, data);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.carService.delete(id);
  }
}

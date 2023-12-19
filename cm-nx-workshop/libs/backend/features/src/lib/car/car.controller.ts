import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { ICar } from '@cm-nx-workshop/shared/api';
import { CreateCarDto } from '@cm-nx-workshop/backend/dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService){}

    @Get('')
    getAll():Promise<ICar[]>{
        return this.carService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id:string):Promise<ICar | null>{
        return this.carService.findOne(id);
    }

    @Post('')
    async create(@Body() data: CreateCarDto): Promise<ICar|null> {
      console.log("Training create - create controller");
        
      return this.carService.create(data);
    }

}

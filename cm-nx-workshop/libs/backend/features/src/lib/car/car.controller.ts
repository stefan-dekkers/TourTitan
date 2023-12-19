import { Controller, Get, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { ICar } from '@cm-nx-workshop/shared/api';

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

}

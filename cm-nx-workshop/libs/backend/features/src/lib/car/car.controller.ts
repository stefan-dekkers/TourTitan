import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { ICar, ICreateLocation, ILocation } from '@cm-nx-workshop/shared/api';
import { CreateCarDto, UpdateCarDto } from '@cm-nx-workshop/backend/dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService){}

    @Get('')
    getAll():Promise<ICar[]>{
        return this.carService.findAll();
    }
    @Get('location')
    getAllL():Promise<ILocation[]>{
        return this.carService.findAllL();
    }

    @Get(':id')
    getOne(@Param('id') id:string):Promise<ICar | null>{
        return this.carService.findOne(id);
    }


    @Post('')
    async create(@Body() requestData: { dataCar: CreateCarDto, dataLocation: ICreateLocation }): Promise<ICar|null> {
        console.log("Training create - create controller");

        const { dataCar, dataLocation } = requestData;
        return this.carService.create(dataCar, dataLocation);
    }

    @Put(':id')
    async update(@Body() data: UpdateCarDto, @Param('id') id: string): Promise<ICar|null> {
    return this.carService.update(id,data);
    }


    @Delete(':id')
    delete(@Param('id')id: string):Promise<{ deleted: boolean; message?: string }>{
        return this.carService.delete(id)
    }

}

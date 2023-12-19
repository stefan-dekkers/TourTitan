import { ICar } from "@cm-nx-workshop/shared/api";
import { Injectable, Logger } from "@nestjs/common";

const mockCar: ICar[] =[
    {
        id: '0',
        name: 'Cruiser One',
        plateNumber: 'ABC123',
        capacity: 5,
        mileage: 10000,
        available: true,
        location: 'Parking Lot A'
    },
    {
        id: '1',
        name: 'SpeedCM',
        plateNumber: 'XYZ789',
        capacity: 4,
        mileage: 8000,
        available: false,
        location: 'Garage B'
    },
    {
        id: '2',
        name: 'CM Explorer',
        plateNumber: 'DEF456',
        capacity: 7,
        mileage: 12000,
        available: true,
        location: 'Street C'
    }
];

@Injectable()
export class CarService{
    private readonly logger: Logger = new Logger(CarService.name);

    async findAll(): Promise<ICar[]>{
        this.logger.log('Find all cars');
        //return mock data
        return mockCar.map(car =>{
            return car;
        })
    }

    async findOne(id:string):Promise<ICar | null>{
        this.logger.log(`Looking for car with id ${id}`)

        const car = mockCar.find(car => car.id === id);
        
        if(!car){
            this.logger.debug('Car not found');
            return null
        }

        return car;
    }
}
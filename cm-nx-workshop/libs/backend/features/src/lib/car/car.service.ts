import { ICar, ICreateCar, IUpdateCar } from "@cm-nx-workshop/shared/api";
import { ConflictException, Injectable, Logger } from "@nestjs/common";

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

    async create(car: ICreateCar): Promise<ICar>{
        this.logger.log('Create new car');

        const exixtingCar = mockCar.find(c => c.plateNumber === car.plateNumber);
        if(exixtingCar){
            throw new ConflictException(`Car with plateNumber ${car.plateNumber} already exists`)
        }

        const newCar ={
            id: mockCar.length.toString(),
            name: car.name,
            plateNumber: car.plateNumber,
            capacity: car.capacity,
            location: car.location,
            available: true
        }

        mockCar.push(newCar);
        return newCar
    }

    async update(id: string, car: IUpdateCar): Promise <ICar | null>{
        this.logger.log(`Updating car with id: ${id}`)
        const index = mockCar.findIndex(car => car.id === id);
        if (index === -1) {
            this.logger.debug('Car not found');
            return null;
        }
        const updatedCar = { ...mockCar[index], ...car};
        mockCar[index] = updatedCar;
        return updatedCar
    }

    async delete(id:string): Promise<{ deleted: boolean; message?: string }>{
        const index = mockCar.findIndex(car => car.id === id);
        if (index === -1) {
            this.logger.debug(`No car found to delete with id: ${id}`);
            return { deleted: false, message: 'No car found with that ID' };
        }
        mockCar.splice(index, 1);
        this.logger.log(`Deleted car with id: ${id}`);
        return { deleted: true };
    }
}
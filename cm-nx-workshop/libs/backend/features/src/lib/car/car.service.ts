import { ICar, ICreateCar, ICreateLocation, ILocation, IUpdateCar } from "@cm-nx-workshop/shared/api";
import { ConflictException, Injectable, Logger } from "@nestjs/common";

const mockCar: ICar[] =[
    {
        id: '0',
        name: 'Cruiser One',
        plateNumber: 'ABC123',
        capacity: 5,
        mileage: 10000,
        available: true,
        location: '0'
    },
    {
        id: '1',
        name: 'SpeedCM',
        plateNumber: 'XYZ789',
        capacity: 4,
        mileage: 8000,
        available: false,
        location: '0'
    },
    {
        id: '2',
        name: 'CM Explorer',
        plateNumber: 'DEF456',
        capacity: 7,
        mileage: 12000,
        available: true,
        location: '2'
    }
];

const mockLocation: ILocation[] =[
    {
        id: '0',
        name: 'Breda office',
        zipCode: '1234AB',
        street: 'Bredastraat',
        number: 12
    },
    {
        id: '1',
        name: 'Amsterdam office',
        zipCode: '1234AB',
        street: 'Amsterdanweg',
        number: 14
    },
    {
        id: '2',
        name: 'Groningen office',
        zipCode: '1234AB',
        street: 'Groningenweg',
        number: 34
    },
]

@Injectable()
export class CarService{
    private readonly logger: Logger = new Logger(CarService.name);

    async findAll(): Promise<ICar[]> {
        this.logger.log('Find all cars');
        const carsWithLocations = mockCar.map((car) => {
          const location = mockLocation.find((l) => l.id === car.location);
          return { ...car, locationObject: location };
        });
        return carsWithLocations;
      }

    async findOne(id:string):Promise<ICar | null>{
        this.logger.log(`Looking for car with id ${id}`)

        const car = mockCar.find(car => car.id === id);
        
        if(!car){
            this.logger.debug('Car not found');
            return null
        }

        const location = mockLocation.find(l => l.id === car.location)
        if(!location){
            this.logger.debug('Location of car not found')
            return null
        }

        const carWithTraining: ICar ={
            ...car,
            locationObject: location
        }

        return carWithTraining;
    }

    async create(car: ICreateCar, location: ICreateLocation): Promise<ICar> {
        this.logger.log('Create new car');
        let locationId = '';

        const existingLocation = mockLocation.find(l =>
          l.name === location.name &&
          l.zipCode === location.zipCode &&
          l.street === location.street &&
          l.number === location.number
        );
      
        if (existingLocation) {
          this.logger.log(`Location ${location.name} already exits at id ${existingLocation.id}`);
          locationId = existingLocation.id;
        } else {
          this.logger.log(`Creating location: ${location.name}`);
          const newLocation = {
            id: mockCar.length.toString(), 
            name: location.name,
            zipCode: location.zipCode,
            street: location.street,
            number: location.number
          };
      
          mockLocation.push(newLocation);
          locationId = newLocation.id;
        }
      
        const existingCar = mockCar.find(c => c.plateNumber === car.plateNumber);
        if (existingCar) {
          throw new ConflictException(`Car with plateNumber ${car.plateNumber} already exists`);
        }
      
        const newCar = {
          id: mockCar.length.toString(),
          name: car.name, 
          plateNumber: car.plateNumber,
          capacity: car.capacity,
          location: locationId,
          available: true
        };
      
        mockCar.push(newCar);
        return newCar;
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
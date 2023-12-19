import { Id } from "./id.type";
import { ILocation } from "./location.interface";

export interface ICar{
    id:Id;
    name: string;
    plateNumber: string;
    capacity: number;
    mileage?: number;
    available: boolean;
    location: string;
    locationObject? : ILocation
}

export type ICreateCar = Pick<
    ICar,
    'name' | 'plateNumber' | 'capacity' | 'location'
>;

export type IUpdateCar = Partial<Omit<ICar, 'id'>>;
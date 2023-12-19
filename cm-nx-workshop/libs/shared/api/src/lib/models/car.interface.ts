import { Id } from "./id.type";

export interface ICar{
    id:Id;
    name: string;
    plateNumber: string;
    capacity: number;
    mileage: number;
    available: boolean;
    location: string;
}

export type ICreateCar = Pick<
    ICar,
    'name' | 'plateNumber' | 'capacity' | 'location'
>;

export type IUpdateCar = Partial<Omit<ICar, 'id'>>;
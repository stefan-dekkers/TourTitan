import { Id } from './id.type';
import { ILocation } from './location.interface';

export interface ICar {
  id: Id;
  name: string;
  plateNumber: string;
  capacity: number;
  mileage: number;
  isAvailable: boolean;
  location: ILocation;
  imageUrl?: string;
}

export type ICreateCar = Pick<
  ICar,
  'name' | 'plateNumber' | 'capacity' | 'mileage' | 'isAvailable' | 'location'
>;

export type IUpdateCar = Partial<Omit<ICar, 'id'>>;

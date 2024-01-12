import { Id } from './id.type';

export interface ILocation {
  id?: Id;
  zipCode: string;
  street: string;
  city: string;
  number: number;
}

export type ICreateLocation = Pick<
  ILocation,
  'zipCode' | 'street' | 'number' | 'city'
>;

export type IUpdateLocation = Partial<Omit<ILocation, 'id'>>;

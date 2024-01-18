import { ICar } from './car.interface';
import { Id } from './id.type';
import { ILocation } from './location.interface';
import { IUser } from './user.interface';

export enum Status {
  PENDING = 'pending',
  DRIVING = 'driving',
  FINISHED = 'finished',
}

export interface IRide {
  id?: Id;
  driver: IUser;
  passengers?: IUser[];
  vehicle: ICar;
  isPublic: boolean;
  status: Status;
  departureLocation: ILocation;
  arrivalLocation: ILocation;
  departureTime: Date;
  arrivalTime?: Date;
  distance?: number;
}

export type ICreateRide = Pick<
  IRide,
  | 'driver'
  | 'passengers'
  | 'vehicle'
  | 'isPublic'
  | 'status'
  | 'arrivalLocation'
  | 'departureTime'
>;

export type IUpdateRide = Partial<Omit<IRide, 'id'>>;


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
  id: Id;
  driver: IUser;
  passengers?: IUser[];
  vehicle: ICar;
  isPublic: boolean;
  status: Status;
  departureLocation: ILocation;
  arrivalLocation: ILocation;
  departureTime: Date;
  arrivalTime: Date;
  distance?: number;
}

export type ICreateRide = Pick<
  IRide,
  | 'driver'
  | 'passengers'
  | 'vehicle'
  | 'isPublic'
  | 'status'
  | 'departureLocation'
  | 'arrivalLocation'
  | 'departureTime'
>;
// update the driver and car and departurelocation
export type IUpdateRide = Partial<Omit<IRide, 'id'>>;

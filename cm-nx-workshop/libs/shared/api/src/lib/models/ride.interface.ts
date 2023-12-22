import { Id } from "./id.type";
import { ILocation } from "./location.interface";
import { IUser } from "./user.interface";
export enum Status {
    PENDING = 'pending',
    DRIVING = 'driving',
    FINISHED = 'finished',
  }

export interface IRide {
    id: Id;
    name: string;
    driverId: string; 
    passengers: IUser[]; 
    vehicleId: string; 
    isPublic: boolean;
    status: Status; 
    departureLocationId: string ; 
    arrivalLocation: ILocation;
    departureTime: Date;
    arrivalTime: Date;
    distance: number;
  }
  
  export type ICreateRide = Pick<
    IRide,
    'name' | 'driverId' | 'passengers' | 'vehicleId' | 'isPublic' | 
    'status' | 'departureLocationId' | 'arrivalLocation' | 'departureTime' 
  >;
  // update the driver and car and departurelocation 
  export type IUpdateRide = Partial<Omit<IRide, 'id'>>;
  
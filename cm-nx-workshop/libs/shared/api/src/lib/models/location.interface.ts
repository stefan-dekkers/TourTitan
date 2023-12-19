import { Id } from "./id.type";

export interface ILocation{
    id:Id;
    name: string;
    zipCode: string;
    street: string;
    number : number;
}

export type ICreateLocation = Pick<
    ILocation,
    'name' | 'zipCode' | 'street' | 'number'
>;

export type IUpdateLocation = Partial<Omit<ILocation, 'id'>>;

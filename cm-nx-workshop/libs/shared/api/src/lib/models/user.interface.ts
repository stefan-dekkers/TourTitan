import { Id } from './id.type';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
export interface IUser {
  id: Id;
  name: string;
  emailAddress: string;
  password: string;
  role: UserRole;
  token?: string | undefined;
}
export type ICreateUser = Pick<
  IUser,
  'name' | 'emailAddress' | 'password' | 'role'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;

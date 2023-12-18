import { Id } from "./id.type";

export enum UserRole {
    Admin = 'admin',
    User = 'user'
  }
  export class IUser {
    id:Id;
    name:string	;
    emailAddress: string;
    password: string;
    role: UserRole;
    token?: string | undefined;
    constructor(
      id='',
      name='',
      emailAddress = '',
      password = '',
      role: UserRole.User,
    ) {
      this.id=id;
      this.name = name;  
      this.emailAddress = emailAddress;
      this.password = password;
      this.role = role;
    }
  }
  
  export type ICreateUser = Pick<
    IUser,
    'name' | 'emailAddress' | 'password' | 'role' 
  >;
  export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
  export type IUpsertUser = IUser;


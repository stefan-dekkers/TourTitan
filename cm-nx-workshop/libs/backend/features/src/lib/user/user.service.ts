import { IUser } from "@cm-nx-workshop/shared/api";
import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
  
  @Injectable()
  export class UserService {
      private readonly logger: Logger = new Logger(UserService.name);
      constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
      ){}
      async findAll(): Promise<IUser[]> {
        this.logger.log('Finding all users');
        return this.userRepository.find({
            select: [ 'id','name', 'emailAddress', 'role'] 
        });
    }
  
    async findOne(_id: string): Promise<IUser | null> {
        this.logger.log(`Finding user with id ${_id}`);
        return this.userRepository.findOne({
            where: { id :_id},
            select: ['id','name', 'emailAddress', 'role']
        });
    }
    
  
    findOneByEmail(email: string): Promise<IUser | null> {
        this.logger.log(`Finding user by email ${email}`);
        return this.userRepository.findOne({
            where: { emailAddress: email },
            select: ['id','name', 'emailAddress', 'role','password']
        });
    }
    
  
    async create(user: Partial<IUser>): Promise<IUser> {
        this.logger.log(`Creating user with email ${user.emailAddress}`);
        const existingUser = await this.userRepository.findOne({ where: { emailAddress: user.emailAddress } });
        if (existingUser) {
            throw new ConflictException('Email address already in use');
        }
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    
  
    async update(_id: string, userUpdate: Partial<IUser>): Promise<IUser | null> {
        this.logger.log(`Updating user with id ${_id}`);
        await this.userRepository.update(_id, userUpdate);
        return this.userRepository.findOne({where: {id : _id}});
    }
    
  
    async delete(_id: string): Promise<{ deleted: boolean; message?: string }> {
        this.logger.log(`Deleting user with id: ${_id}`);
        const result = await this.userRepository.delete(_id);
        if (result.affected === 0) {
            return { deleted: false, message: 'No user found with that ID' };
        }
        return { deleted: true };
    }
    
  }

// import { IUser,UserRole } from "@cm-nx-workshop/shared/api";
// import { ConflictException, Injectable, Logger } from "@nestjs/common";

// const mockUsers: IUser[] = [
//     {
//       id: '1',
//       name: 'John Doe',
//       emailAddress: 'john@example.com',
//       password: 'hashedpassword',
//       role: UserRole.User,
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       emailAddress: 'jane@example.com',
//       password: 'hashedpassword',
//       role: UserRole.Admin,
//     },
//   ];
  
//   @Injectable()
//   export class UserService {
//       private readonly logger: Logger = new Logger(UserService.name);
  
//       async findAll(): Promise<IUser[]> {
//           this.logger.log('Finding all users');
//           // Return the mock users instead of querying the database
//           return mockUsers.map(user => {
//             // Exclude the password field
//             const { password, ...userWithoutPassword } = user;
//             return user;
//           });
//       }
  
//       async findOne(_id: string): Promise<IUser | null> {
//           this.logger.log(`Finding user with id ${_id}`);
//           const user = mockUsers.find(user => user.id === _id);
//           if (!user) {
//               this.logger.debug('User not found');
//               return null;
//           }
//           const { password, ...userWithoutPassword } = user;
//           return user;
//       }
  
//       findOneByEmail(email: string): IUser | null {
//           this.logger.log(`Finding user by email ${email}`);
//           const user = mockUsers.find(user => user.emailAddress === email);
//           if (!user) {
//               this.logger.debug('User not found');
//               return null;
//           }
//           const { password, ...userWithoutPassword } = user;
//           return user;
//       }
  
//       async create(user: Partial<IUser>): Promise<IUser> {
//           this.logger.log(`Creating user with email ${user.emailAddress}`);
//             // Controleer of het e-mailadres al bestaat
//         const existingUser = mockUsers.find(u => u.emailAddress === user.emailAddress);
//         if (existingUser) {
//             // Gooi een ConflictException als het e-mailadres al in gebruik is
//             throw new ConflictException('Email address already in use');
//         }
//           const newUser = {
//               id: mockUsers.length.toString(),
//               name: user.name || '',
//               emailAddress: user.emailAddress || '',
//               password: user.password || '',
//               role: user.role || UserRole.User,
//           };
//           mockUsers.push(newUser);
//           return newUser;
//       }
  
//       async update(_id: string, userUpdate: Partial<IUser>): Promise<IUser | null> {
//           this.logger.log(`Updating user with id ${_id}`);
//           const index = mockUsers.findIndex(user => user.id === _id);
//           if (index === -1) {
//               this.logger.debug('User not found');
//               return null;
//           }
//           const updatedUser = { ...mockUsers[index], ...userUpdate };
//           mockUsers[index] = updatedUser;
//           return updatedUser;
//       }
  
//       async delete(_id: string): Promise<{ deleted: boolean; message?: string }> {
//           const index = mockUsers.findIndex(user => user.id === _id);
//           if (index === -1) {
//               this.logger.debug(`No user found to delete with id: ${_id}`);
//               return { deleted: false, message: 'No user found with that ID' };
//           }
//           mockUsers.splice(index, 1);
//           this.logger.log(`Deleted user with id: ${_id}`);
//           return { deleted: true };
//       }
//   }
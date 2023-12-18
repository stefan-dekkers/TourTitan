import { IUser,UserRole } from "@cm-nx-workshop/shared/api";
import { ConflictException, Injectable, Logger } from "@nestjs/common";

const mockUsers: IUser[] = [
    {
      id: '0',
      name: 'John Doe',
      emailAddress: 'john@example.com',
      password: 'hashedpassword',
      role: UserRole.User,
    },
    {
      id: '1',
      name: 'Jane Smith',
      emailAddress: 'jane@example.com',
      password: 'hashedpassword',
      role: UserRole.Admin,
    },
  ];
  
  @Injectable()
  export class UserService {
      private readonly logger: Logger = new Logger(UserService.name);
  
      async findAll(): Promise<IUser[]> {
          this.logger.log('Finding all users');
          // Return the mock users instead of querying the database
          return mockUsers.map(user => {
            // Exclude the password field
            const { password, ...userWithoutPassword } = user;
            return user;
          });
      }
  
      async findOne(_id: string): Promise<IUser | null> {
          this.logger.log(`Finding user with id ${_id}`);
          const user = mockUsers.find(user => user.id === _id);
          if (!user) {
              this.logger.debug('User not found');
              return null;
          }
          const { password, ...userWithoutPassword } = user;
          return user;
      }
  
      findOneByEmail(email: string): IUser | null {
          this.logger.log(`Finding user by email ${email}`);
          const user = mockUsers.find(user => user.emailAddress === email);
          if (!user) {
              this.logger.debug('User not found');
              return null;
          }
          const { password, ...userWithoutPassword } = user;
          return user;
      }
  
      async create(user: Partial<IUser>): Promise<IUser> {
          this.logger.log(`Creating user with email ${user.emailAddress}`);
            // Controleer of het e-mailadres al bestaat
        const existingUser = mockUsers.find(u => u.emailAddress === user.emailAddress);
        if (existingUser) {
            // Gooi een ConflictException als het e-mailadres al in gebruik is
            throw new ConflictException('Email address already in use');
        }
          const newUser = {
              id: mockUsers.length.toString(),
              name: user.name || '',
              emailAddress: user.emailAddress || '',
              password: user.password || '',
              role: user.role || UserRole.User,
          };
          mockUsers.push(newUser);
          return newUser;
      }
  
      async update(_id: string, userUpdate: Partial<IUser>): Promise<IUser | null> {
          this.logger.log(`Updating user with id ${_id}`);
          const index = mockUsers.findIndex(user => user.id === _id);
          if (index === -1) {
              this.logger.debug('User not found');
              return null;
          }
          const updatedUser = { ...mockUsers[index], ...userUpdate };
          mockUsers[index] = updatedUser;
          return updatedUser;
      }
  
      async delete(_id: string): Promise<{ deleted: boolean; message?: string }> {
          const index = mockUsers.findIndex(user => user.id === _id);
          if (index === -1) {
              this.logger.debug(`No user found to delete with id: ${_id}`);
              return { deleted: false, message: 'No user found with that ID' };
          }
          mockUsers.splice(index, 1);
          this.logger.log(`Deleted user with id: ${_id}`);
          return { deleted: true };
      }
  }
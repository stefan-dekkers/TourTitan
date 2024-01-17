import { IUser } from '@cm-nx-workshop/shared/api';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<IUser[]> {
    this.logger.log('Finding all users');
    return this.userRepository.find({
      select: ['id', 'name', 'emailAddress', 'role'],
    });
  }

  async findOne(_id: string): Promise<IUser | null> {
    this.logger.log(`Finding user with id ${_id}`);
    return this.userRepository.findOne({
      where: { id: _id },
      select: ['id', 'name', 'emailAddress', 'role'],
    });
  }

  findOneByEmail(email: string): Promise<IUser | null> {
    this.logger.log(`Finding user by email ${email}`);
    return this.userRepository.findOne({
      where: { emailAddress: email },
      select: ['id', 'name', 'emailAddress', 'role', 'password'],
    });
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    this.logger.log(`Creating user with email ${user.emailAddress}`);
    const existingUser = await this.userRepository.findOne({
      where: { emailAddress: user.emailAddress },
    });
    if (existingUser) {
      throw new ConflictException('Email address already in use');
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(_id: string, userUpdate: Partial<IUser>): Promise<IUser | null> {
    this.logger.log(`Updating user with id ${_id}`);
    await this.userRepository.update(_id, userUpdate);
    return this.userRepository.findOne({ where: { id: _id } });
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

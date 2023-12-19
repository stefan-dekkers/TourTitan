import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsEnum,
    IsOptional,
  } from 'class-validator';
  import { IUpdateUser, IUser, UserRole } from '@cm-nx-workshop/shared/api';
  import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Id } from 'libs/shared/api/src/lib/models/id.type';
  export class CreateUserDto implements IUser {
    id!: Id;
    
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsNotEmpty()
    @IsString()
    name!: string;
  
    @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
    @IsEmail()
    emailAddress!: string;
  
    @ApiProperty({ example: 'password', description: 'The password of the user', type: 'string' })
    @IsNotEmpty()
    @IsString()
    password!: string;
  
    @ApiProperty({ enum: UserRole, description: 'The role of the user' })
    @IsEnum(UserRole)
    role!: UserRole;
  }
  
  export class UpdateUserDto implements IUpdateUser{
    @ApiPropertyOptional({ example: 'John Doe', description: 'The  name of the user' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'john@example.com', description: 'The email address of the user' })
    @IsOptional()
    @IsEmail()
    emailAddress?: string;
  
    @ApiPropertyOptional({ description: 'The password of the user' })
    @IsOptional()
    @IsString()
    password?: string;
  
  
    @ApiPropertyOptional({ enum: UserRole, description: 'The role of the user' })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
  }
  
  export class LoginFormDto {
    @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
    @IsNotEmpty()
    @IsEmail()
    emailAddress!: string;
  
    @ApiProperty({ example: 'hashedpassword', description: 'The password of the user', type: 'string' })
    @IsNotEmpty()
    password!: string;
  }
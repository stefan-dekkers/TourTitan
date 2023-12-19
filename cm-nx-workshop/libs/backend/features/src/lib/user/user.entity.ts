import { UserRole } from '@cm-nx-workshop/shared/api';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  emailAddress!: string;

  @Column()
  password!: string;
  
 @Column({
    type: 'varchar', 
    enum: UserRole,
  })
  role!: UserRole;
}


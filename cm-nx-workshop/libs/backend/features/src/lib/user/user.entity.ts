import { IRide, UserRole } from '@cm-nx-workshop/shared/api';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RideEntity } from '../ride/ride.entity';
// import { RideEntity } from '../ride/ride.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  emailAddress!: string;

  @Column({ select: false })
  password!: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
  })
  role!: UserRole;

  @OneToMany(() => RideEntity, (ride) => ride.driver)
  drivenRides!: IRide[];
}

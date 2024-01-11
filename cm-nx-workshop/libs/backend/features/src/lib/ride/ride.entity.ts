import { Status } from "@cm-nx-workshop/shared/api";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { CarEntity } from "../car/car.entity";
import { LocationEntity } from "../location/location.entity";

@Entity()
export class RideEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinTable()
  driver!: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  passengers!: UserEntity[];

  @ManyToOne(() => CarEntity,(car) => car)
  vehicle!: CarEntity;

  @Column()
  isPublic!: boolean;

  @Column({
    type: 'varchar',
    enum: Status
  })
  status!: Status;

  @ManyToOne(() => LocationEntity, (location) => location)
  departureLocation!: LocationEntity;

  @ManyToOne(() => LocationEntity, (location) => location)
  arrivalLocation!: LocationEntity;

  @Column('datetime')
  departureTime!: Date;

  @Column({type:'datetime', nullable:true})
  arrivalTime!: Date;

  @Column({type:'int', nullable:true})
  distance!: number;
}
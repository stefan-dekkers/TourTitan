// import { Status } from "@cm-nx-workshop/shared/api";
// import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { UserEntity } from "../user/user.entity";
// import { CarEntity } from "../car/car.entity";
// import { LocationEntity } from "../location/location.entity";

// @Entity()
// export class RideEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column()
//   name!: string;

//   @ManyToOne(() => UserEntity, user => user.drivenRides)
//   driverId!: string;

//   @ManyToMany(() => UserEntity)
//   @JoinTable()
//   passengers!: UserEntity[];

//   @ManyToOne(() => CarEntity)
//   vehicle!: CarEntity;

//   @Column()
//   isPublic!: boolean;

//   @Column({
//     type: 'varchar',
//     enum: Status
//   })
//   status!: Status;

//   @ManyToOne(() => LocationEntity, (location) => location)
//   departureLocation!: LocationEntity;

//   @ManyToOne(() => LocationEntity, (location) => location)
//   arrivalLocation!: LocationEntity;

//   @Column('datetime')
//   departureTime!: Date;

//   @Column('datetime')
//   arrivalTime!: Date;

//   @Column('int')
//   distance!: number;
// }
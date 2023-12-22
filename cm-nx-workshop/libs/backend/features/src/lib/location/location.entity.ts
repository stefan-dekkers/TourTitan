import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CarEntity } from '../car/car.entity';
// import { RideEntity } from '../ride/ride.entity';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  city!: string;

  @Column()
  zipCode!: string;

  @Column()
  street!: string;

  @Column()
  number!: number;

  @OneToMany(() => CarEntity, (car) => car.location)
  cars!: CarEntity[];
  // @OneToMany(() => RideEntity, (ride) => ride.arrivalLocation)
  // arrivalLocation!: RideEntity[];
  // @OneToMany(() => RideEntity, (ride) => ride.departureLocation)
  // departureLocation!: RideEntity[];
}

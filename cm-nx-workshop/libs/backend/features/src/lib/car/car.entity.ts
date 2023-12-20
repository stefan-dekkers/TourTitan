import { ILocation } from '@cm-nx-workshop/shared/api';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity()
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  plateNumber!: string;

  @Column()
  capacity!: number;

  @Column()
  mileage!: number;

  @Column()
  isAvailable!: boolean;

  @ManyToOne(() => LocationEntity, (location) => location.cars)
  location!: LocationEntity;

  @Column({ nullable: true })
  imageUrl?: string;
}

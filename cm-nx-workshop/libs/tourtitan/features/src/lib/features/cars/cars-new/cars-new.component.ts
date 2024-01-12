import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Id } from 'libs/shared/api/src/lib/models/id.type';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
import { CreateCarDto, UpdateCarDto } from '@cm-nx-workshop/backend/dto';


@Component({
  selector: 'cm-nx-workshop-cars-new',
  templateUrl: './cars-new.component.html',
  styleUrls: ['./cars-new.component.css'], 
})
export class CarsNewComponent implements OnInit, OnDestroy {
  carId: Id | null = null;
  newCar: CreateCarDto = {
    name: '',
    plateNumber: '',
    capacity: 0,
    mileage: 0,
    imageUrl: '',
    isAvailable: true,
    location: {
      city: '',
      zipCode: '',
      street: '',
      number: 0,
    },
  };

  private carSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.getCurrentUser() != null) {
      this.route.paramMap.subscribe(async (params) => {
        this.carId = params.get('id') ?? null;
        if (this.carId) {
          this.carSubscription = this.carsService.read(this.carId).subscribe(
            (car) => {
              this.newCar = {
                name: car.name,
                plateNumber: car.plateNumber,
                capacity: car.capacity,
                mileage: car.mileage,
                isAvailable: car.isAvailable,
                imageUrl: car.imageUrl || '', 
                location: car.location,
              };
              console.log(this.newCar.imageUrl);
            },
            (error) => {
              console.error('Error fetching car:', error);
            }
          );
        } else {
          // New car
        }
      });
    }
    else{
      this.router.navigate([`/`]);
    }
    
  }

  ngOnDestroy(): void {
    if (this.carSubscription) {
      this.carSubscription.unsubscribe();
    }
  }

  submitForm() {
    console.log('onSubmit - create/update');

    if (this.carId) {
      console.log('Update new car');
      this.carsService.update(this.carId, this.newCar).subscribe({
        next: (car) => {
          console.log('Car added updated:', car);
          this.router.navigate([`/cars/${this.carId}`], {
            relativeTo: this.route,
          });
        },
        error: (error) => {
          console.error('Error adding car:', error);
        },
      });
    } else {
      console.log('Creating new car');
      this.carsService.create(this.newCar).subscribe({
        next: (createdCar) => {
          console.log('Car added successfully:', createdCar);
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          console.error('Error adding car:', error);
        },
      });
    }
  }

  isUpdate(): boolean {
    if (this.carId) {
      return true;
    }
    return false;
  }
}

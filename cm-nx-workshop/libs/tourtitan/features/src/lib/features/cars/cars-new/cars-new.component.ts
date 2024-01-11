import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Id } from 'libs/shared/api/src/lib/models/id.type';

@Component({
  selector: 'cm-nx-workshop-cars-new',
  templateUrl: './cars-new.component.html',
  styles: [],
})
export class CarsNewComponent implements OnInit, OnDestroy {
  carId: Id | null = null;
  newCar: ICar = {
    name: '',
    plateNumber: '',
    capacity: 0,
    mileage: 0,
    id: '',
    isAvailable: false,
    location: {
      id: '',
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.carId = params.get('id') ?? null;
      if (this.carId) {
        // Existing training
        this.carSubscription = this.carsService.read(this.carId).subscribe(
          (car) => {
            this.newCar = car;
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

  ngOnDestroy(): void {
    if (this.carSubscription) {
      this.carSubscription.unsubscribe();
    }
  }

  submitForm() {
    console.log('Creating new car');
    this.carsService.create(this.newCar).subscribe({
      next: (createdCar) => {
        console.log('Car added successfully:', createdCar);
        // Optionally, you can navigate to another page or perform additional actions after addition.
        this.router.navigate(['/cars']); // Navigate to the cars list page
      },
      error: (error) => {
        console.error('Error adding car:', error);
      },
    });
  }
}

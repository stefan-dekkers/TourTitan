import { Component } from '@angular/core';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { ICar, ILocation } from '@cm-nx-workshop/shared/api';

@Component({
  selector: 'cm-nx-workshop-cars-new',
  templateUrl: './cars-new.component.html',
  styles: [],
})
export class CarsNewComponent {
  newCar: ICar = {
    name: '',
    plateNumber: '',
    capacity: 0,
    mileage: 0,
    id: '',
    isAvailable: false,
    location: {
      id: '',
      zipCode: '',
      street: '',
      number: 0,
    },
  };

  constructor(private carsService: CarsService, private router: Router) {}

  submitForm(): void {
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

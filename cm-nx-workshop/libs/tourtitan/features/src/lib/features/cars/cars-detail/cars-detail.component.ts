import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICar } from '@cm-nx-workshop/shared/api';
import { CarsService } from '../cars.service';

@Component({
  selector: 'cm-nx-workshop-cars',
  templateUrl: './cars-detail.component.html',
  styles: [],
})
export class CarDetailComponent implements OnInit, OnDestroy {
  car: ICar | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      const carId = params.get('id');

      if (carId) {
        this.carsService.read(carId).subscribe((car) => {
          this.car = car;
        });
      }
    });
  }

  deleteCar(): void {
    if (this.car?.id) {
      this.carsService.delete(this.car).subscribe({
        next: () => {
          console.log('Car deleted successfully');
          // Optionally, you can navigate to another page or perform additional actions after deletion.
        },
        error: (error) => {
          console.error('Error deleting car:', error);
        },
      });
    } else {
      console.error('Car id is missing for deletion.');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, getLocaleTimeFormat } from '@angular/common';
import { Subscription } from 'rxjs';
import { ICar } from '@cm-nx-workshop/shared/api';
import { CarsService } from '../cars.service';

@Component({
  selector: 'cm-nx-workshop-cars',
  templateUrl: './cars-list.component.html',
  styles: [],
})
export class CarsListComponent implements OnInit, OnDestroy {
  cars: ICar[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.subscription = this.carsService.list().subscribe((results) => {
      this.cars = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  formatLicensePlate(plateNumber: string): string {
    // Format license plate to resemble Dutch format (e.g., XX-99-99)
    if (plateNumber && plateNumber.length === 6) {
      return `${plateNumber.substring(0, 2)}-${plateNumber.substring(
        2,
        4
      )}-${plateNumber.substring(4, 6)}`;
    }
    return plateNumber; // Return original if not in the expected format
  }
}

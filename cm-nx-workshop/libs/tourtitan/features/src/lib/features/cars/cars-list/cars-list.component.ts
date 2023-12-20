import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
}
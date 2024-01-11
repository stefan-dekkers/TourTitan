import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RidesService } from '../rides.service';
import { IRide } from '@cm-nx-workshop/shared/api';


@Component({
  selector: 'cm-nx-workshop-available-ride',
  templateUrl: './available-ride.component.html',
  styles: [],
})

export class AvailableRidesComponent implements OnInit, OnDestroy {
  ride: IRide[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private ridesService: RidesService) {}

  ngOnInit(): void {
    this.subscription = this.ridesService.list().subscribe((results) => {
      this.ride = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  
}
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RidesService } from '../../rides.service';
import { IRide } from '@cm-nx-workshop/shared/api';


@Component({
  selector: 'cm-nx-workshop-my-rides',
  templateUrl: './my-rides-list.component.html',
  styles: [],
})

export class MyRidesListComponent implements OnInit, OnDestroy {
  ride: IRide[] | null = null;
  filteredRides: IRide[] | null = null;
  searchTerm: string = '';
  subscription: Subscription | undefined = undefined;

  constructor(private ridesService: RidesService) {}

  ngOnInit(): void {
    this.subscription = this.ridesService.list().subscribe((results) => {
      this.ride = results;
      this.filteredRides = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  filterRides(): void {
    this.filteredRides = this.ride?.filter(ride =>
      ride.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ) || [];
  }
}
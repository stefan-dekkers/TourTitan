// new-ride.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation, IRide, Status } from '@cm-nx-workshop/shared/api';
import { ICar } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Id } from 'libs/shared/api/src/lib/models/id.type';

@Component({
  selector: 'cm-nx-workshop-new-ride',
  templateUrl: './new-ride.component.html',
})
export class NewRideComponent implements OnInit, OnDestroy {
  carId: Id | null = null;
  newCar: ICar = {
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

  rideId: Id | null = null;
  newRide: IRide = {
    name: '',
    driverId: '',
    passengers: [],
    vehicleId: '',
    isPublic: true,
    status: Status.PENDING,
    arrivalLocation: {
      city: '',
      zipCode: '',
      street: '',
      number: 0,
    },
    departureTime: new Date(),
    arrivalTime: new Date(),
    distance: 0,
    id: '',
    departureLocationId: ''
  };

  private rideSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private ridesService: RidesService,
    private router: Router
  ) {}

  hardcodedLocations: ILocation[] = [
    { city: 'City1', zipCode: '12345', street: 'Street1', number: 1 },
    { city: 'City2', zipCode: '67890', street: 'Street2', number: 2 },
    // Add more hardcoded options as needed
  ];

  filteredLocations: ILocation[] = [];
  searchText = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.rideId = params.get('id') ?? null;
      if (this.rideId) {
        this.rideSubscription = this.ridesService.read(this.rideId).subscribe(
          (ride) => {
            this.newRide = ride;
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

    this.filteredLocations = [...this.hardcodedLocations];
  }

  ngOnDestroy(): void {
    if (this.rideSubscription) {
      this.rideSubscription.unsubscribe();
    }
  }

  filterLocations() {
    this.filteredLocations = this.hardcodedLocations.filter(location =>
      this.searchMatch(location)
    );
  }

  searchMatch(location: ILocation): boolean {
    const searchLower = this.searchText.toLowerCase();
    return (
      location.city.toLowerCase().includes(searchLower) ||
      location.zipCode.includes(this.searchText) ||
      location.street.toLowerCase().includes(searchLower) ||
      location.number.toString().includes(this.searchText)
    );
  }

  submitForm() {
    console.log('onSubmit - create/update');

    if (this.rideId) {
      console.log('Update new ride');
      this.ridesService.update(this.rideId, this.newRide).subscribe({
        next: (ride) => {
          console.log('Ride added updated:', ride);
          this.router.navigate([`/my-rides/${this.rideId}`], {
            relativeTo: this.route,
          });
        },
        error: (error) => {
          console.error('Error adding car:', error);
        },
      });
    } else {
      console.log('Creating new car');
      this.ridesService.create(this.newRide).subscribe({
        next: (createdRide) => {
          console.log('Car added successfully:', createdRide);
          this.router.navigate(['/my-rides']);
        },
        error: (error) => {
          console.error('Error adding car:', error);
        },
      });
    }
  }

  isUpdate(): boolean {
    if (this.rideId) {
      return true;
    }
    return false;
  }
}

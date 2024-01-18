import { Component, OnDestroy, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ILocation,
  IRide,
  IUser,
  Status,
  UserRole,
} from '@cm-nx-workshop/shared/api';
import { ICar } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Id } from 'libs/shared/api/src/lib/models/id.type';
import { CarsService } from '../../cars/cars.service';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';

@Component({
  selector: 'cm-nx-workshop-new-ride',
  templateUrl: './new-ride.component.html',
})
export class NewRideComponent implements OnInit, OnDestroy {
  rideId: Id | null = null;
  ride: IRide = {
    driver: {
      name: '',
      emailAddress: '',
      role: UserRole.User,
      id: '',
      password: '',
    },
    vehicle: {
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
    },
    isPublic: true,
    status: Status.PENDING,
    arrivalLocation: {
      city: '',
      zipCode: '',
      street: '',
      number: 0,
    },
    departureTime: new Date(),
    departureLocation: {
      city: '',
      zipCode: '',
      street: '',
      number: 0,
    },
  };
  errorMessage: string = '';
  formattedDepartureTime: string = '';
  private rideSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private ridesService: RidesService,
    private router: Router,
    private carsService: CarsService,
    private authService: AuthService
  ) {}

  carsList: ICar[] = [];

  ngOnInit(): void {
    if (this.authService.getCurrentUser() != null) {
      this.ride.driver = this.authService.getCurrentUser()!;
      this.loadCars();
      this.route.paramMap.subscribe(async (params) => {
        this.rideId = params.get('id') ?? null;
        if (this.rideId) {
          this.rideSubscription = this.ridesService.read(this.rideId).subscribe(
            (ride) => {
              this.ride = ride;
              // console.log(this.ride.toString());
            },
            (error) => {
              console.error('Error fetching car:', error);
            }
          );
        } else {
          // New car
        }
      });
    } else {
      this.router.navigate([`/`]);
    }
  }

  loadCars(): void {
    this.carsService.list().subscribe(
      (cars: ICar[] | null) => {
        cars?.forEach((c) => {
          if (c.isAvailable === true) {
            this.carsList.push(c);
          }
        });
      },
      (error) => {
        console.error('Error loading cars:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.rideSubscription) {
      this.rideSubscription.unsubscribe();
    }
  }

  submitForm() {
    console.log('onSubmit - create/update');

    if (this.rideId) {
      console.log('Update new ride');
      this.ridesService.update(this.rideId, this.ride).subscribe({
        next: (ride) => {
          console.log('Ride added updated:', ride);
          this.router.navigate([`/my-rides/${this.rideId}`], {
            relativeTo: this.route,
          });
        },
        error: (error) => {
          console.error('Error adding ride:', error);
        },
      });
    } else {
      if (!(this.ride.departureTime instanceof Date)) {
        this.ride.departureTime = new Date(this.ride.departureTime);
      }
      this.formattedDepartureTime = this.formatDateForDateTimeLocal(
        this.ride.departureTime
      );
      console.log('Creating new ride');
      console.log(this.ride);
      if (this.formattedDepartureTime) {
        this.ride.departureTime = new Date(this.formattedDepartureTime);
      }

      this.ridesService.create(this.ride).subscribe({
        next: (createdRide) => {
          console.log('Car added successfully:', createdRide);
          this.router.navigate(['/my-rides']);
        },
        error: (error) => {
          console.error('Error adding ride:', error);
          this.errorMessage =
            error.error?.message ||
            error.message ||
            'An error occurred while creating the ride';
        },
      });
    }
  }
  private formatDateForDateTimeLocal(date: Date): string {
    return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(
      date.getDate()
    )}T${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
  }

  private pad(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }
  isUpdate(): boolean {
    if (this.rideId) {
      return true;
    }
    return false;
  }
}

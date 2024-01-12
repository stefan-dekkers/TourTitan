import { Component, OnDestroy, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation, IRide, IUser, Status, UserRole } from '@cm-nx-workshop/shared/api';
import { ICar } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Id } from 'libs/shared/api/src/lib/models/id.type';
import { CarsService } from '../../cars/cars.service';
@Component({
  selector: 'cm-nx-workshop-ride-details',
  templateUrl: './ride-details.component.html',
})
export class RideDetailComponent implements OnInit, OnDestroy {
  
  locationId: Id | null = null
  location: ILocation = {
    zipCode: '',
    street: '',
    city: '',
    number: 0
  }

  userId: Id | null = null;
  user: IUser = {
    name: '',
    emailAddress: '',
    role: UserRole.User,
    id: '',
    password: ''
  };
  
  carId: Id | null = null;
  car: ICar = {
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
  ride: IRide = {
    driver: this.user,
    passengers: [],
    vehicle: this.car,
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
    departureLocation: this.location,
  };



  private rideSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private ridesService: RidesService,
    private router: Router,
    private carsService: CarsService
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.rideId = params.get('id') ?? null;
      if (this.rideId) {
        this.rideSubscription = this.ridesService.read(this.rideId).subscribe(
          (ride) => {
            this.ride = ride;
            console.log(this.car.imageUrl);
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
    if (this.rideSubscription) {
      this.rideSubscription.unsubscribe();
    }
  }


    
  
  

}

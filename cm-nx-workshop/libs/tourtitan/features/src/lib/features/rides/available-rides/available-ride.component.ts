import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RidesService } from '../rides.service';
import { IRide, Status } from '@cm-nx-workshop/shared/api';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
import { IUser } from '@cm-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
@Component({
  selector: 'cm-nx-workshop-available-ride',
  templateUrl: './available-ride.component.html',
  styles: [],
})



export class AvailableRideComponent implements OnInit, OnDestroy {
  ride: IRide[] | null = null;
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;
  alertMessage: string = '';

  filteredRides: IRide[] | null = null;
  searchTerm: string = '';
  status: string = ''
  constructor(private ridesService: RidesService, private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      const currentUser = this.authService.getCurrentUser();
      console.log(currentUser);
    
      if (currentUser !== null) {
        this.user = currentUser;
        this.subscription = this.ridesService.list(currentUser.id).subscribe((results) => {
          this.ride = results;
    
          // Call the filterRides method after fetching the rides
          this.filterRides();
        });
      } else {
        this.router.navigate([`/`], {
          relativeTo: this.route,
        });
      }
    }
    
    ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
    }
    
    filterRides(): void {
      this.filteredRides = this.ride?.filter((ride) =>
        ride.isPublic === true &&
        this.getAmountOfPassengers(ride) < ride.vehicle.capacity &&
        ride.status === Status.PENDING &&
        // Check if user is not already a passenger
        !ride.passengers?.some((passenger) => passenger.id === this.user?.id)
      ) || [];
    }
    

    getAmountOfPassengers(ride : IRide): number{
      //+1, because of the driver
      if (ride && ride.passengers) {
        return ride.passengers.length + 1;
      } else {
        return 1;
      }
    }
    


  formatDateTime(inputDate: Date | undefined): string {
    if (inputDate === undefined) {
      return ''; // or provide a default value or handle accordingly
    }
  
    const date = new Date(inputDate);
    
    // Ensure the input date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Get date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    // Get time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${hours}:${minutes}`;
  
    return formattedDate;
  }

  formatDateFull(inputDate: Date | undefined): string {
    if (inputDate === undefined) {
      return ''; // or provide a default value or handle accordingly
    }

    const date = new Date(inputDate);
  
    // Ensure the input date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Get date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    // Get time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  
    return formattedDate;
  }

  formatDateDay(inputDate: Date): string {
    const date = new Date(inputDate);
  
    // Ensure the input date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Get date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    // Get time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
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
  

  joinRide(id?: string): void {
    this.ridesService.join(id, this.user?.id).subscribe(
      (success) => {
        console.log(`User ${this.user?.id} joined ride ${id}`);
        this.alertMessage = `You have joined the ride!`;
        this.router.navigate(['/my-rides']);
      },
      (error) => {
        console.error('Error joining ride: ', error);
        this.alertMessage = `Error joining ride: ${error.message}`;
      }
    );
  }
  
}
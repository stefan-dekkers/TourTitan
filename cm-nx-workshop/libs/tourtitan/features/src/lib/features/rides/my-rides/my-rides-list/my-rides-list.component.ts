import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RidesService } from '../../rides.service';
import { IRide } from '@cm-nx-workshop/shared/api';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
import { IUser } from '@cm-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarDeleteComponent } from '../../../cars/cars-detail/car-delete/car-delete.component';
import { RideFinishComponent } from '../../ride-finish/ride-finish.component';

@Component({
  selector: 'cm-nx-workshop-my-rides',
  templateUrl: './my-rides-list.component.html',
  styles: [],
})



export class MyRidesListComponent implements OnInit, OnDestroy {
  ride: IRide[] | null = null;
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;
  
  filteredRides: IRide[] | null = null;
  searchTerm: string = '';
  status: string = ''
  constructor(private ridesService: RidesService, private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,     private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
      //Hier moet de userId komen van de ingelogde user
      const currentUser = this.authService.getCurrentUser();
    
      if (currentUser !== null) {
        this.subscription = this.authService.currentUser$.subscribe((results) => {
          this.user = results;
          this.loadRides();
        });
      } else {
        this.router.navigate([`/`], {
          relativeTo: this.route,
        });
      }
    }
    
    loadRides(): void {
      if (this.user && this.user.id) {
        this.subscription = this.ridesService.list_user(this.user.id).subscribe((results) => {
          this.ride = results;
          this.filteredRides = results;
        });
      }
    }
    
    

  

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  

  filterRides(): void {
    this.filteredRides = this.ride?.filter(ride =>
      ride.arrivalLocation.street.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      ride.status.toLowerCase() === this.status.toLowerCase()
    ) || [];
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
  
  finishRide(ride: IRide): void {
      const modalRef: NgbModalRef = this.modalService.open(RideFinishComponent, {
        centered: true,
        backdrop: true,
      });
      
      modalRef.componentInstance.ride = ride;
  
      modalRef.componentInstance.confirmFinish.subscribe(() => {
        if (ride.id) {
          this.ridesService.finish(ride.id, ride).subscribe({
            next: () => {
              // Update the ride list after finishing
              this.loadRides();
            },
            error: (error) => {
              console.error('Error finishing ride:', error);
            },
          });
        } else {
          console.error('Ride id is missing for finishing.');
        }
      });
    
  }
  
  
}
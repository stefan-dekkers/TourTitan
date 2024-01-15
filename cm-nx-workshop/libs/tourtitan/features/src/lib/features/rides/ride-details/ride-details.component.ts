import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IRide } from '@cm-nx-workshop/shared/api';
import { RidesService } from '../rides.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';


@Component({
  selector: 'cm-nx-workshop-ride-detail',
  templateUrl: './ride-details.component.html'
})
export class RideDetailComponent implements OnInit, OnDestroy {
  ride: IRide | undefined;
  subscription: Subscription | undefined = undefined;
  
  constructor(
    private ridesService: RidesService,
    private modalService: NgbModal,
    private rideService: RidesService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if(this.authService.getCurrentUser() != null){
      this.subscription = this.route.paramMap.subscribe((params) => {
        const rideId = params.get('id');
  
        if (rideId) {
          this.rideService.read(rideId).subscribe((ride) => {
            this.ride = ride;
          });
        }
      });
    }
    else{
      this.router.navigate([`/`]);
    }
  }

  // deleteRide(): void {
  //   if (this.ride) {
  //     const modalRef: NgbModalRef = this.modalService.open(CarDeleteComponent, {
  //       centered: true,
  //       backdrop: false,
  //     });
  //     modalRef.componentInstance.car = this.car;

  //     modalRef.componentInstance.confirmDelete.subscribe(() => {
  //       if (this.car?.id) {
  //         this.carsService.delete(this.car).subscribe({
  //           next: () => {
  //             // console.log('Car deleted successfully');
  //             this.router.navigate(['/cars']);
  //           },
  //           error: (error) => {
  //             console.error('Error deleting car:', error);
  //           },
  //         });
  //       } else {
  //         console.error('Car id is missing for deletion.');
  //       }
  //     });
  //   } else {
  //     console.error('Car not found.');
  //   }
  // }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  isAdmin(): boolean{
    if(this.authService.isAdmin()){
      return true
    }
    return false
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

  
}

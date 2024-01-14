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
  ride: IRide | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
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
}

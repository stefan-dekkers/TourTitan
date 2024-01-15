import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from '@cm-nx-workshop/shared/api';
import { CarsService } from '../cars.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarDeleteComponent } from './car-delete/car-delete.component';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';


@Component({
  selector: 'cm-nx-workshop-cars',
  templateUrl: './cars-detail.component.html',
  styles: [],
})
export class CarDetailComponent implements OnInit, OnDestroy {
  car: ICar | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private modalService: NgbModal,
    private carsService: CarsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if(this.authService.getCurrentUser() != null){
      this.subscription = this.route.paramMap.subscribe((params) => {
        const carId = params.get('id');
  
        if (carId) {
          this.carsService.read(carId).subscribe((car) => {
            this.car = car;
          });
        }
      });
    }
    else{
      this.router.navigate([`/`]);
    }
  }

  deleteCar(): void {
    if (this.car) {
      const modalRef: NgbModalRef = this.modalService.open(CarDeleteComponent, {
        centered: true,
        backdrop: true,
      });
      modalRef.componentInstance.car = this.car;

      modalRef.componentInstance.confirmDelete.subscribe(() => {
        if (this.car?.id) {
          this.carsService.delete(this.car).subscribe({
            next: () => {
              // console.log('Car deleted successfully');
              this.router.navigate(['/cars']);
            },
            error: (error) => {
              console.error('Error deleting car:', error);
            },
          });
        } else {
          console.error('Car id is missing for deletion.');
        }
      });
    } else {
      console.error('Car not found.');
    }
  }

  
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

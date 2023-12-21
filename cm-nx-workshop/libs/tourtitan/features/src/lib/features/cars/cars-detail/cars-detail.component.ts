import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from '@cm-nx-workshop/shared/api';
import { CarsService } from '../cars.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CarDeleteComponent } from './car-delete/car-delete.component';
// import { CarDeleteComponent } from './car-delete/car-delete.component';

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
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.subscription = this.route.paramMap.subscribe((params) => {
        const carId = params.get('id');
  
        if (carId) {
          this.carsService.read(carId).subscribe((car) => {
            this.car = car;
          });
        }
      });
    }
  

  deleteCar(): void {
    if (this.car) {
      const modalRef: NgbModalRef = this.modalService.open(CarDeleteComponent, {
        centered: true,
        backdrop: false,
      });
      modalRef.componentInstance.car = this.car;

      modalRef.componentInstance.confirmDelete.subscribe(() => {
        if (this.car?.id) {
          this.carsService.delete(this.car).subscribe({
            next: () => {
              console.log('Car deleted successfully');
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

    
  }

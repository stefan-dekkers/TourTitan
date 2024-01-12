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
    //Hier moet de userId komen van de ingelogde user
    this.subscription = this.ridesService.list_user('2617D607-C09E-EE11-85F8-005056A6A0FB').subscribe((results) => {
      this.ride = results;
      this.filteredRides = results;
    });
  }

  

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  

  filterRides(): void {
    this.filteredRides = this.ride?.filter(ride =>
      ride.arrivalLocation.street.toLowerCase().includes(this.searchTerm.toLowerCase())
    ) || [];
  }

  formatDate(inputDate: Date): string {
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
  
  
}
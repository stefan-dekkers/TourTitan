import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { FormsModule } from '@angular/forms';
import { MyRidesListComponent } from './rides/my-rides/my-rides-list/my-rides-list.component';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { CarsService } from './cars/cars.service';
import { CarDetailComponent } from './cars/cars-detail/cars-detail.component';
import { CarsNewComponent } from './cars/cars-new/cars-new.component';
import { CarDeleteComponent } from './cars/cars-detail/car-delete/car-delete.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { NewRideComponent } from './rides/new-ride/new-ride.component';
import { AvailableRidesComponent } from './rides/available-rides/available-ride.component';
import { RidesService } from './rides/rides.service';
import { RideDetailComponent } from './rides/ride-details/ride-details.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    MyRidesListComponent,
    CarsListComponent,
    CarsNewComponent,
    UserProfileComponent,
    CarDetailComponent,
    CarDeleteComponent,
    SidebarComponent,
    NewRideComponent,
    AvailableRidesComponent,
    RideDetailComponent
  ],
  providers: [UserService, CarsService, RidesService],
  exports: [
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    MyRidesListComponent,
    CarsListComponent,
    CarDetailComponent,
    CarsNewComponent,
    UserProfileComponent,
    CarDeleteComponent,
    SidebarComponent,
    CarDeleteComponent,
    NewRideComponent,
    AvailableRidesComponent,
    UserProfileComponent,
    CarDeleteComponent,
    RideDetailComponent
  ],
})
export class FeaturesModule {}

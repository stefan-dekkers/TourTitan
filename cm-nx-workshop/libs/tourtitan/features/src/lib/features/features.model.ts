import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { FormsModule } from '@angular/forms';
import { MyRidesComponent } from './my-rides/my-rides.component';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
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

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    MyRidesComponent,
    CarsListComponent,
    CarsNewComponent,
    AvailableRidesComponent,
    UserProfileComponent,
    CarDetailComponent,
    CarDeleteComponent,
    SidebarComponent
  ],
  providers: [UserService, CarsService],
  exports: [
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    MyRidesComponent,
    CarsListComponent,
    CarDetailComponent,
    CarsNewComponent,
    AvailableRidesComponent,
    UserProfileComponent,
    CarDeleteComponent,
    SidebarComponent
    CarDeleteComponent,
  ],
})
export class FeaturesModule {}

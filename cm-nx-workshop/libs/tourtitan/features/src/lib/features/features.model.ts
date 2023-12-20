import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user/user-login/user-login.component';
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

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  declarations: [
    UserLoginComponent,
    MyRidesComponent,
    CarsListComponent,
    AvailableRidesComponent,
    UserProfileComponent,
    CarDetailComponent,
  ],
  providers: [UserService, CarsService],
  exports: [
    UserLoginComponent,
    MyRidesComponent,
    CarsListComponent,
    CarDetailComponent,
    AvailableRidesComponent,
    UserProfileComponent,
  ],
})
export class FeaturesModule {}

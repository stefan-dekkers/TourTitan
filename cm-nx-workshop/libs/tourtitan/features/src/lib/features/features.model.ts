import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { FormsModule } from '@angular/forms';
import { MyRidesComponent } from './my-rides/my-rides.component'
import { CarsComponent } from './cars/cars.component';
import { AvailableRidesComponent } from './available-rides/available-rides.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  declarations: [UserLoginComponent, MyRidesComponent, CarsComponent, AvailableRidesComponent, UserProfileComponent],
  providers: [UserService],
  exports: [UserLoginComponent, MyRidesComponent, CarsComponent, AvailableRidesComponent, UserProfileComponent],
})
export class FeaturesModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [UserLoginComponent],
  providers: [UserService],
  exports: [UserLoginComponent],
})
export class FeaturesModule {}
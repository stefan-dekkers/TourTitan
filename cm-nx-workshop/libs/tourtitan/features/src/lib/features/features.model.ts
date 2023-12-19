import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule],
  declarations: [UserLoginComponent],
  providers: [UserService],
  exports: [UserLoginComponent],
})
export class FeaturesModule {}
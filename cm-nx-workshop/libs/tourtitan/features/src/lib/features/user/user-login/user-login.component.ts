import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-nx-workshop-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  TAG = 'UserLoginComponent';
  subscription: Subscription | undefined = undefined;
  email!: string;
  password!: string;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  authenticate(emailAddress: string, password: string) {
    console.log(
      'Authenticate ontvangen' + emailAddress + ' ' + password,
      this.TAG
    );
    this.userService.authenticate(emailAddress, password);
  }
}

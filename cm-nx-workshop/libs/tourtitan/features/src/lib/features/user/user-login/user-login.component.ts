import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '@cm-nx-workshop/shared/api';

@Component({
  selector: 'cm-nx-workshop-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  user: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.user = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  authenticate(email: string, password: string): void {
    this.userService.authenticate(email, password);
  }
}
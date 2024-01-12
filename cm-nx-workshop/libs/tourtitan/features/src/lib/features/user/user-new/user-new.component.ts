import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, UserRole } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Id } from 'libs/shared/api/src/lib/models/id.type';
import { UserService } from '../user.service';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';

@Component({
  selector: 'cm-nx-workshop-user-new',
  templateUrl: './user-new.component.html',
  styles: [],
})
export class UserNewComponent implements OnInit, OnDestroy {
  userId: Id | null = null;
  newUser: IUser = {
    
    name: '',
    emailAddress: '',
    role: UserRole.User,
    password: ''
  };

  private userSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.route.paramMap.subscribe(async (params) => {
        this.userId = params.get('id') ?? null;
        if (this.userId) {
          this.userSubscription = this.userService.read(this.userId).subscribe(
            (user) => {
              this.newUser = user;
              console.log(this.newUser.emailAddress);
            },
            (error) => {
              console.error('Error fetching user:', error);
            }
          );
        } else {
          // New car
        }
      });
    }
    else{
      this.router.navigate([`/cars`], {
        relativeTo: this.route,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  submitForm() {
    console.log('onSubmit - create/update');

    if (this.userId) {
      console.log('Update new user');
      this.userService.update(this.userId, this.newUser).subscribe({
        next: (user) => {
          console.log('User added updated:', user);
          this.router.navigate([`/user/${this.userId}`], {
            relativeTo: this.route,
          });
        },
        error: (error) => {
          console.error('Error adding user:', error);
        },
      });
    } else {
      console.log('Creating new user');
      this.userService.create(this.newUser).subscribe({
        next: (createdUser) => {
          console.log('User added successfully:', createdUser);
          this.router.navigate(['/user']);
        },
        error: (error) => {
          console.error('Error adding user:', error);
        },
      });
    }
  }

  isCreate(): boolean {
    if (this.userId) {
      return false;
    }
    return true;
  }
}

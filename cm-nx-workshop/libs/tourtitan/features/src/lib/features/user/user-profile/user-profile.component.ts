import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
import { UserService } from '../user.service';
import { IUser } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cm-nx-workshop-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [],
})
export class UserProfileComponent  implements OnInit, OnDestroy{
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;


  constructor(private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {

      if (this.authService.getCurrentUser() !== null) {
        this.subscription = this.authService.currentUser$.subscribe((results) => {
          this.user = results;
          
        });
      }else{
        this.router.navigate([`/`], {
          relativeTo: this.route,
        });
      }
      
    }
  
    ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
    }

    logout(): void{
      this.authService.logout();
    }

}


import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar, IUser } from '@cm-nx-workshop/shared/api';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';

@Component({
  selector: 'cm-nx-workshop-user',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.subscription = this.route.paramMap.subscribe((params) => {
        const userId = params.get('id');
  
        if (userId) {
          this.userService.read(userId).subscribe((user) => {
            this.user = user;
          });
        }
      });
    }
    else{
      this.router.navigate([`/cars`], {
        relativeTo: this.route,
      });
    }
  }

  deleteUser(): void {
    if (this.user) {
      const modalRef: NgbModalRef = this.modalService.open(
        UserDeleteComponent,
        {
          centered: true,
          backdrop: false,
        }
      );
      modalRef.componentInstance.user = this.user;

      modalRef.componentInstance.confirmDelete.subscribe(() => {
        if (this.user?.id) {
          this.userService.delete(this.user).subscribe({
            next: () => {
              console.log('User deleted successfully');
              this.router.navigate(['/user']);
            },
            error: (error) => {
              console.error('Error deleting user:', error);
            },
          });
        } else {
          console.error('User id is missing for deletion.');
        }
      });
    } else {
      console.error('User not found.');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

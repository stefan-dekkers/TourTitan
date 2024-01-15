import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { IUser } from '@cm-nx-workshop/shared/api';
import { AuthService } from '../../../../../../auth/src/lib/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cm-nx-workshop-user',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  filteredUsers: IUser[] | null = null;
  searchTerm: string = '';
  subscription: Subscription | undefined = undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.subscription = this.userService.list().subscribe((results) => {
        this.users = results;
        this.filteredUsers = results;
      });
    } else {
      this.router.navigate([`/`], {
        relativeTo: this.route,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  filterUsers(): void {
    this.filteredUsers =
      this.users?.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) || [];
  }
}

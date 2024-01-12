import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';


@Component({
  selector: 'cm-nx-workshop-sidebar-component',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
  ) {}

  isAdmin(): boolean{
    if (this.authService.isAdmin()) {
      return true
    }
    return false
  }
}

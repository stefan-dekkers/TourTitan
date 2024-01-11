import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';


@Component({
  selector: 'cm-nx-workshop-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  imagePath?: string;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.imagePath = 'assets/img/tt-logo-128.png';
  }
  isLoggedIn(): boolean{
    if (this.authService.getCurrentUser() === null) {
      return false
    }
    return true;
  }
  
}

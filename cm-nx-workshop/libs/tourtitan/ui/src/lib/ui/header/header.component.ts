import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cm-nx-workshop-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  imagePath?: string;

  ngOnInit(): void {
    this.imagePath = 'assets/img/tt-logo-128.png';
  }
}

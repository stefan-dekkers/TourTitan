import { Component, OnInit } from '@angular/core';

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

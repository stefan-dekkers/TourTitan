import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeaturesModule } from '@cm-nx-workshop/tourtitan/features'
@Component({
  standalone: true,
  imports: [FeaturesModule, NxWelcomeComponent, RouterModule],
  selector: 'cm-nx-workshop-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tour-titan';
}

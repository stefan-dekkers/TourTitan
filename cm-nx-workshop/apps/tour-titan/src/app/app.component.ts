import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesModule } from '@cm-nx-workshop/tourtitan/features';
import { UiModule } from '@cm-nx-workshop/ui';
@Component({
  standalone: true,
  imports: [FeaturesModule, RouterModule, UiModule],
  selector: 'cm-nx-workshop-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tour-titan';
}

import { Component, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@cm-nx-workshop/tourtitan/auth';
import { FeaturesModule } from '@cm-nx-workshop/tourtitan/features';
import { UiModule } from '@cm-nx-workshop/ui';
@Component({
  standalone: true,
  imports: [FeaturesModule, RouterModule, UiModule, AuthModule],
  providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
  selector: 'cm-nx-workshop-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tour-titan';
}

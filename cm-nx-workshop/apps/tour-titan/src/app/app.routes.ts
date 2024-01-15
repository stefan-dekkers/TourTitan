import { Route } from '@angular/router';
import { LoginComponent } from '@cm-nx-workshop/tourtitan/auth';
import { AvailableRidesComponent } from 'libs/tourtitan/features/src/lib/features/available-rides/available-rides.component';
import { CarDetailComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars-detail/cars-detail.component';
import { CarsListComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars-list/cars-list.component';
import { CarsNewComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars-new/cars-new.component';
import { MyRidesComponent } from 'libs/tourtitan/features/src/lib/features/my-rides/my-rides.component';
import { UserProfileComponent } from 'libs/tourtitan/features/src/lib/features/user/user-profile/user-profile.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'my-rides',
    component: MyRidesComponent,
    pathMatch: 'full',
  },
  {
    path: 'cars',
    component: CarsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'cars/new',
    component: CarsNewComponent,
    pathMatch: 'full',
  },
  {
    path: 'cars/edit/:id',
    component: CarsNewComponent,
    pathMatch: 'full',
  },
  {
    path: 'cars/:id',
    component: CarDetailComponent,
    pathMatch: 'full',
  },

  {
    path: 'user-profile',
    component: UserProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'available-rides',
    component: AvailableRidesComponent,
    pathMatch: 'full',
  },
];

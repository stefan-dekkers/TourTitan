import { Route } from '@angular/router';
import { CarsListComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars-list/cars-list.component';
import { CarDetailComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars-detail/cars-detail.component';
import { UserProfileComponent } from 'libs/tourtitan/features/src/lib/features/user/user-profile/user-profile.component';
import { CarsNewComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars-new/cars-new.component';
import { UserListComponent } from 'libs/tourtitan/features/src/lib/features/user/user-list/user-list.component';
import { UserNewComponent } from 'libs/tourtitan/features/src/lib/features/user/user-new/user-new.component';
import { UserDetailComponent } from 'libs/tourtitan/features/src/lib/features/user/user-detail/user-detail.component';
import { MyRidesListComponent } from 'libs/tourtitan/features/src/lib/features/rides/my-rides/my-rides-list/my-rides-list.component';
import { AvailableRidesComponent } from 'libs/tourtitan/features/src/lib/features/rides/available-rides/available-ride.component';
import { NewRideComponent } from 'libs/tourtitan/features/src/lib/features/rides/new-ride/new-ride.component';
import { LoginComponent } from '@cm-nx-workshop/tourtitan/auth';


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
    component: MyRidesListComponent,
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
    path: 'user',
    component: UserListComponent,
    pathMatch: 'full',
  },
  {
    path: 'user/new',
    component: UserNewComponent,
    pathMatch: 'full',
  },
  {
    path: 'user/edit/:id',
    component: UserNewComponent,
    pathMatch: 'full',
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'available-rides',
    component: AvailableRidesComponent,
    pathMatch: 'full',
  },
  {
    path: 'my-rides/new',
    component: NewRideComponent,
    pathMatch: 'full'
  },{
    path: 'available-rides/new',
    component: NewRideComponent,
    pathMatch: 'full'
  }

];

import { Route } from '@angular/router';
import { UserLoginComponent } from 'libs/tourtitan/features/src/lib/features/user/user-login/user-login.component';
import { MyRidesComponent } from 'libs/tourtitan/features/src/lib/features/my-rides/my-rides.component';
import { CarsComponent } from 'libs/tourtitan/features/src/lib/features/cars/cars.component';
import { UserProfileComponent } from 'libs/tourtitan/features/src/lib/features/user/user-profile/user-profile.component';
import { AvailableRidesComponent } from 'libs/tourtitan/features/src/lib/features/available-rides/available-rides.component';
export const appRoutes: Route[] = [
     {
         path: 'login',
         component: UserLoginComponent,
         pathMatch: 'full'
     },
     {
        path: '',
        component: UserLoginComponent,
        pathMatch: 'full'
    },
     {
         path: 'my-rides',
         component: MyRidesComponent,
         pathMatch: 'full'
     },{
        path: 'cars',
        component: CarsComponent,
        pathMatch: 'full'
    },{
        path: 'user-profile',
        component: UserProfileComponent,
        pathMatch: 'full'
    },{
        path: 'available-rides',
        component: AvailableRidesComponent,
        pathMatch: 'full'}
]

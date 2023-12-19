import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@cm-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cm-nx-workshop-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
    meals: IUser[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.subscription = this.userService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.meals = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    authenticate(email: string, password: string): void{
        UserService.authenticate(email, password);
    }
}

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class UserService {
  endpoint_user = 'http://localhost:3000/api/user';
  endpoint_auth = 'http://localhost:3000/api/auth/login';

  constructor(private readonly http: HttpClient, private router: Router) {}

  authenticate(emailAddress: string, password: string) {
    if (true) {
      //als authenticatie succesvol is...
      this.router.navigate(['myrides']);
    }
  }

  public list(options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint_user}`);

    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint_user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<IUser> {
    console.log(`read ${this.endpoint_user}`);
    return this.http
      .get<ApiResponse<IUser>>(this.endpoint_user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in MealService', error);

    return throwError(() => new Error(error.message));
  }
}

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const httpOptions = {
  observe: 'response' as const,
  responseType: 'json' as const,
};

@Injectable()
export class UserService {
  TAG = 'UserService';

  endpoint_user = 'http://localhost:3000/api/user';
  endpoint_auth = 'http://localhost:3000/api/auth/login';

  constructor(private readonly http: HttpClient, private router: Router) {}

  authenticate(emailAddress: string, password: string) {
    const credentials = { emailAddress, password };
    console.log(
      'Authenticate ontvangen' + emailAddress + ' ' + password,
      this.TAG
    );

    this.http
      .post(this.endpoint_auth, credentials, httpOptions)
      .pipe(
        tap((response: any) => {
          console.log('Response:' + response, this.TAG);
          if (response && response.status === 200) {
            this.router.navigate(['my-rides']);
          } else {
            console.error('Authentication failed');
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in UserService', error);

    return throwError(() => new Error(error.message));
  }
}

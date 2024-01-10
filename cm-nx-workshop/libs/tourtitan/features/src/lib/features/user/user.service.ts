import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const httpOptions = {
  observe: 'body' as const,
  responseType: 'json' as const,
};

@Injectable()
export class UserService {
  endpoint = 'http://localhost:3000/api/user';
  endpoint_auth ='http://localhost:3000/api/login'

  constructor(private readonly http: HttpClient) {}

  authenticate(emailAddress: string, password: string)  {
    const credentials = { emailAddress, password };
    console.log('Authenticate ontvangen' + emailAddress + " " + password);

    this.http.post(this.endpoint_auth, credentials, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public update(
    id: string,
    user: IUser,
    options?: any
  ): Observable<IUser | null> {
    const url = `${this.endpoint}/${id}`;
    console.log(`update ${this.endpoint}`);

    return this.http
      .put<ApiResponse<IUser>>(url, user, { ...httpOptions, ...options })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error in UserService:', error);

    return throwError(() => new Error(error.message));
  }
}

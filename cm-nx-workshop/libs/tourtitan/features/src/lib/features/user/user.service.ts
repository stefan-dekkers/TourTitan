import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICar, IUser } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';

export const httpOptions = {
  observe: 'body' as const,
  responseType: 'json' as const,
};

@Injectable()
export class UserService {
  endpoint = 'http://localhost:3000/api/user';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ICar[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IUser> {
    const url = `${this.endpoint}/${id}`;
    console.log(`get ${url}`);
    return this.http
      .get<ApiResponse<IUser>>(url, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public delete(user: IUser): Observable<IUser> {
    console.log(`delete ${this.endpoint}/${user.id}`);

    return this.http
      .delete<ApiResponse<IUser>>(`${this.endpoint}/${user.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public create(user: IUser, options?: any): Observable<IUser> {
    console.log(`create ${this.endpoint}`);

    return this.http
      .post<ApiResponse<IUser>>(this.endpoint, user, {
        ...httpOptions,
        ...options,
      })
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
      .put<ApiResponse<ICar>>(url, user, { ...httpOptions, ...options })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error in UserService:', error);

    return throwError(() => new Error(error.message));
  }
}

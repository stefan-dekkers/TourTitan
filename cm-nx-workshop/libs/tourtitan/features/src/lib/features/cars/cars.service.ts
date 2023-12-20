import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICar } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';

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
export class CarsService {
  endpoint = 'http://localhost:3000/api/car';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<ICar[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ICar[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ICar[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<ICar> {
    const url = this.endpoint + '/' + id;
    console.log(`read ${url}`);
    return this.http
      .get<ApiResponse<ICar>>(url, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ICar),
        catchError(this.handleError)
      );
  }

  public delete(car: ICar): Observable<ICar> {
    console.log(`delete ${this.endpoint}/${car.id}`);
    return this.http
      .delete<ApiResponse<ICar>>(`${this.endpoint}/${car.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }
  
  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in MenuItemService', error);

    return throwError(() => new Error(error.message));
  }
}

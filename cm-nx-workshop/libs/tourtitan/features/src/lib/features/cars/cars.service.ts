import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICar } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { CreateCarDto, UpdateCarDto } from '@cm-nx-workshop/backend/dto';
import { environment } from '@cm-nx-workshop/shared/util-env';

export const httpOptions = {
  observe: 'body' as const,
  responseType: 'json' as const,
};

@Injectable()
export class CarsService {
  endpoint: string = `${environment.dataApiUrl}/car`;

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<ICar[] | null> {
    // console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ICar[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ICar[]),
        tap(),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<ICar> {
    const url = `${this.endpoint}/${id}`;
    // console.log(`get ${url}`);
    return this.http
      .get<ApiResponse<ICar>>(url, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(),
        map((response: any) => response.results as ICar),
        catchError(this.handleError)
      );
  }

  public delete(car: ICar): Observable<ICar> {
    // console.log(`delete ${this.endpoint}/${car.id}`);

    return this.http
      .delete<ApiResponse<ICar>>(`${this.endpoint}/${car.id}`)
      .pipe(tap(), catchError(this.handleError));
  }

  public create(car: ICar, options?: any): Observable<ICar> {
    console.log(`create ${this.endpoint}`);

    return this.http
      .post<ApiResponse<ICar>>(this.endpoint, car, {
        ...httpOptions,
        ...options,
      })
      .pipe(
        tap(),
        map((response: any) => response.results as ICar),
        catchError(this.handleError)
      );
  }

  public update(id: string, car: ICar, options?: any): Observable<ICar | null> {
    const url = `${this.endpoint}/${id}`;
    // console.log(`update ${this.endpoint}`);

    return this.http
      .put<ApiResponse<ICar>>(url, car, { ...httpOptions, ...options })
      .pipe(
        tap(),
        map((response: any) => response.results as ICar),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error in CarsService:', error);

    return throwError(() => new Error(error.message));
  }
}

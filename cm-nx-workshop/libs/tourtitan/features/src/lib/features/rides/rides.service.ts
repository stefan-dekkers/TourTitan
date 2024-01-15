/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IRide, Status } from '@cm-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { CarsService } from '../cars/cars.service';
export const httpOptions = {
  observe: 'body' as const,
  responseType: 'json' as const,
};

@Injectable()
export class RidesService {
  endpoint = 'http://localhost:3000/api/ride';
  endpoint_user = 'http://localhost:3000/api/ride?driverId=';
  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IRide[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IRide[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IRide[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public list_user(
    user_id: string | null,
    options?: any
  ): Observable<IRide[] | null> {
    console.log(`list ${this.endpoint_user}`);
    const url = `${this.endpoint_user}/${user_id}`;
    return this.http
      .get<ApiResponse<IRide[]>>(url, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IRide[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IRide> {
    const url = `${this.endpoint}/${id}`;
    console.log(`get ${url}`);
    return this.http
      .get<ApiResponse<IRide>>(url, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IRide),
        catchError(this.handleError)
      );
  }

  public update(
    id: string,
    ride: IRide,
    options?: any
  ): Observable<IRide | null> {
    const url = `${this.endpoint}/${id}`;
    console.log(`update ${this.endpoint}`);

    return this.http
      .put<ApiResponse<IRide>>(url, ride, { ...httpOptions, ...options })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IRide),
        catchError(this.handleError)
      );
  }
  public finishRide(
    rideId: string,
    driverId: string,
    newMileage: number,
    arrivalTime: Date,
    options?: any
  ): Observable<IRide | null> {
    const url = `${this.endpoint}/${rideId}/finish`;
    const body = { driverId, newMileage, arrivalTime };
    console.log(`finishRide ${url}`);

    return this.http
      .patch<ApiResponse<IRide>>(url, body, { ...httpOptions, ...options })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IRide),
        catchError(this.handleError)
      );
  }

  public create(ride: IRide, options?: any): Observable<IRide> {
    console.log(`create ${this.endpoint}`);
    const url = this.endpoint + '/create';

    return this.http
      .post<ApiResponse<IRide>>(url, ride, {
        ...httpOptions,
        ...options,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IRide),
        catchError(this.handleError)
      );
  }

  /**
   * Handle errors.
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error in RidesService:', error);

    return throwError(() => new Error(error.message));
  }
}

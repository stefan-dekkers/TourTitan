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
  endpoint_user ='http://localhost:3000/api/ride/user' 
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

  public list_user(user_id: string | null, options?: any): Observable<IRide[] | null> {
    console.log(` endpoint used: ${this.endpoint_user}/${user_id}`);
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

  public update(id: string, ride: IRide, options?: any): Observable<IRide | null> {
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

  public finish(id: string, newMileage: number, arrivalTime?: Date, driverId?: string, options?: any): Observable<IRide | null> {
    const url = `${this.endpoint}/${id}/finish`;

    // Create a payload object to include in the request body
    const payload = {
        driverId: driverId,
        newMileage: newMileage,
        arrivalTime: arrivalTime,
    };

    console.log('finished is called ', id);

    return this.http
        .patch<ApiResponse<IRide>>(url, payload, { ...httpOptions, ...options })
        .pipe(
            tap(console.log),
            map((response: any) => response.results as IRide),
            catchError(this.handleError)
        );
}


  public create(ride: IRide, options?: any): Observable<IRide> {
    console.log(`create ${this.endpoint}`);
    const url = this.endpoint +'/create'

    return this.http
      .post<ApiResponse<IRide>>(url, ride, {
        ...httpOptions,
        ...options,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IRide),
        catchError(error => {
          // Handle errors
          let errorMessage = 'Invalid date'
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  public join(id?: string,userId?: string, options?: any): Observable<IRide> {
    console.log(`join  ${this.endpoint}`);
    const url = this.endpoint +'/id/join'

    return this.http
      .post<ApiResponse<IRide>>(url, userId, {
        ...httpOptions,
        ...options,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IRide),
        catchError(error => {
          // Handle errors
          let errorMessage = 'Unable to join ride'
          return throwError(() => new Error(errorMessage));
        })
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

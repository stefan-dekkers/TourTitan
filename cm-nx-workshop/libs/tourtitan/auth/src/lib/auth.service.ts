/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { IUser, UserRole } from '../../../../shared/api/src/lib/models/user.interface';
import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private endpoint = "http://localhost:3000/api/auth";
    private currentUserSubject = new BehaviorSubject<IUser | null>(null);
    private readonly storageKey = 'currentUser';
    private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    constructor(
        private http: HttpClient, 
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
      ) {
        this.initializeUser();
      }
      private initializeUser(): void {
        if (isPlatformBrowser(this.platformId)) {
          const user = this.getUserFromStorage();
          // console.log('InitializeUser - User from storage:', user);
      
          if (user) {
            this.validateToken(user).subscribe((validatedUser) => {
              // console.log('InitializeUser - Token validation response:', validatedUser);
              if (validatedUser) {
                this.currentUserSubject.next(validatedUser);
              } else {
                this.currentUserSubject.next(null);
              }
            });
          }
        }
      }
      login(emailAddress: string, password: string): Observable<IUser | null> {
        return this.http
          .post<{ results: { emailAddress:string, id:string,name:string,role:UserRole,token:string } }>(
            `${this.endpoint}/login`,
            { emailAddress, password },
            { headers: this.headers }
          )
          .pipe(
            map(response => {
              // console.log('Login response:', response);
              const userWithToken = response.results;
              // console.log(userWithToken)

              const user: IUser = {
                emailAddress: userWithToken.emailAddress,
                id: userWithToken.id,
                name: userWithToken.name,
                role: userWithToken.role,
                token: userWithToken.token,
                password: 'Secret'
              };
              this.saveUserToStorage(user);
              this.currentUserSubject.next(user);
              console.log(user);
              return user;
            }),
            catchError(error => {
              // Handle errors
              let errorMessage = 'Login failed. Check your information.';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;
              }
              return throwError(() => new Error(errorMessage));
            })
          );
      }
      validateToken(userData: IUser): Observable<IUser | null> {
        // console.log('validateToken binnen VlaidateToken', userData.token);
        const url = `${this.endpoint}/profile`;
    
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userData.token,
          }),
        };
      
        // console.log('Starting token validation for user:', userData);
      
        return this.http.get<IUser>(url, httpOptions).pipe(
          map((response) => {
            // console.log('Token validation successful, user data:', userData);
            // console.log('Token validation successful, response data:', response);
            return userData;
          }),
          catchError((error: any) => {
            console.error('Token validation failed:', error.message);
            this.logout();
            // console.log('User has been logged out due to token validation failure.');
            return of(null);
          })
        );
      }
      public getUserFromStorage(): IUser | null {
        if (isPlatformBrowser(this.platformId)) {
          const storedUser = sessionStorage.getItem(this.storageKey);
          // console.log('storedUser:', JSON.parse(storedUser!));
          return storedUser ? JSON.parse(storedUser) : null;
        }
        // If not in a browser environment, gracefully handle the absence of sessionStorage
        return null;
      }
    
      // Save user to storage
      protected saveUserToStorage(user: IUser): void {
        sessionStorage.setItem(this.storageKey, JSON.stringify(user));
      }
    
      // Log out the current user
      logout(): void {
        sessionStorage.removeItem(this.storageKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
      isAdmin(): boolean {
        const userString = sessionStorage.getItem(this.storageKey);
        if (userString) {
          const user = JSON.parse(userString);
          // console.log('aaaaaaaaaaaaaaaaaa'+user)
          // Check if the user has the 'admin' role
          if (user?.role === 'admin') {
            return true
          }
        }
      
        return false;
      }
    
    
      // Get the current user's role
      getCurrentUserRole(): string {
        const currentUser = this.currentUserSubject.getValue();
        return currentUser ? currentUser.role : 'guest';
      }
    
      // Centralized error handling method
      private handleError(operation: string) {
        return (error: any): Observable<never> => {
          const errorMessage = error.error?.message || 'An error occurred during ' + operation;
          return throwError(() => new Error(errorMessage));
        };
      }
    
      // Accessor for the current user Observable
      get currentUser$(): Observable<IUser | null> {
        return this.currentUserSubject.asObservable();
      }
      getCurrentUser(): IUser | null {
        // console.log('currentUser', this.currentUserSubject);
        return this.currentUserSubject.value;
      }
      canEdit(userId: string): boolean {
        const currentUser = this.getCurrentUser();
        return !!currentUser && (currentUser.id === userId || currentUser.role === 'admin');
      }
      // Check if the user is logged in
      public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
        map(user => !!user)
      );
      
    }

// //cars-list.component.spec.ts

// // import { ComponentFixture, TestBed } from '@angular/core/testing';
// // import { CarsListComponent } from './cars-list.component';

// // describe('CarsListComponent', () => {
// //   let component: CarsListComponent;
// //   let fixture: ComponentFixture<CarsListComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [CarsListComponent],
// //     }).compileComponents();

// //     fixture = TestBed.createComponent(CarsListComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });
// // import { ComponentFixture, TestBed } from '@angular/core/testing';
// // import { CarsListComponent } from './cars-list.component';
// // import { CarsService } from '../cars.service'; // Adjust the path
// // import { HttpClientModule } from '@angular/common/http'; // Import HttpClientTestingModule

// // describe('CarsListComponent', () => {
// //   let component: CarsListComponent;
// //   let fixture: ComponentFixture<CarsListComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [CarsListComponent],
// //       providers: [CarsService],
// //       imports: [HttpClientModule], // Include HttpClientTestingModule
// //     }).compileComponents();

// //     fixture = TestBed.createComponent(CarsListComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarsListComponent } from './cars-list.component';
// import { CarsService } from '../cars.service';
// import { of } from 'rxjs';
// import { ICar } from '@cm-nx-workshop/shared/api';

// describe('CarsListComponent', () => {
//   let component: CarsListComponent;
//   let fixture: ComponentFixture<CarsListComponent>;
//   let carsService: CarsService;

//   beforeEach(async () => {
//     const carsServiceMock = {
//       list: jest.fn(),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [CarsListComponent],
//       providers: [
//         {
//           provide: CarsService,
//           useValue: carsServiceMock,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CarsListComponent);
//     component = fixture.componentInstance;
//     carsService = TestBed.inject(CarsService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call list method on initialization and set cars', () => {
//     const mockCars: ICar[] = [
//       {
//         id: '1',
//         name: 'Car 1',
//         plateNumber: 'ABC123',
//         capacity: 5,
//         mileage: 10000,
//         isAvailable: true,
//         location: {
//           zipCode: '12345',
//           street: 'Mock Street',
//           city: 'Mock City',
//           number: 42,
//           id: ''
//         },
//         imageUrl: 'mock-image-url',
//       },
//       // Add more mock cars as needed
//     ];

//     jest.spyOn(carsService, 'list').mockReturnValue(of(mockCars));

//     component.ngOnInit();

//     expect(carsService.list).toHaveBeenCalled();
//     expect(component.cars).toEqual(mockCars);
//   });

//   it('should format license plate correctly', () => {
//     const plateNumber = 'ABC123';
//     const formattedPlate = component.formatLicensePlate(plateNumber);
//     expect(formattedPlate).toEqual('AB-C1-23');
//   });

//   it('should leave license plate unchanged if not in expected format', () => {
//     const plateNumber = 'ABCD123';
//     const formattedPlate = component.formatLicensePlate(plateNumber);
//     expect(formattedPlate).toEqual(plateNumber);
//   });

//   // Add more tests as needed

//   afterEach(() => {
//     fixture.destroy();
//   });
// });
//------------------------------------------------------------------------------------------------------------------
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarsListComponent } from './cars-list.component';
// import { CarsService } from '../cars.service';
// import { of } from 'rxjs';
// import { ICar } from '@cm-nx-workshop/shared/api';
// import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
// import { SidebarComponent } from '../../sidebar/sidebar.component'; // Import your sidebar component

// describe('CarsListComponent', () => {
//   let component: CarsListComponent;
//   let fixture: ComponentFixture<CarsListComponent>;
//   let carsService: CarsService;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const carsServiceMock = {
//       list: jest.fn(),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [CarsListComponent, SidebarComponent],
//       providers: [
//         {
//           provide: CarsService,
//           useValue: carsServiceMock,
//         },
//         AuthService, // Provide AuthService here
//       ],
//       imports: [HttpClientModule, RouterTestingModule], // Add HttpClientModule and RouterTestingModule
//     }).compileComponents();

//     fixture = TestBed.createComponent(CarsListComponent);
//     component = fixture.componentInstance;
//     carsService = TestBed.inject(CarsService);
//     authService = TestBed.inject(AuthService); // Inject AuthService

//     // Override the private property with a mock instance
//     Object.defineProperty(component, 'authService', { value: authService });

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call list method on initialization and set cars', () => {
//     const mockCars: ICar[] = [
//       {
//         id: '1',
//         name: 'Car1',
//         plateNumber: 'ABC123',
//         capacity: 5,
//         mileage: 10000,
//         isAvailable: true,
//         location: {
//           zipCode: '1234XX',
//           street: 'Streetname',
//           city: 'Cityname',
//           number: 4,
//         },
//         imageUrl: 'car1.jpg',
//       },
//     ];

//     // Define component.cars in the class
//     component.cars = mockCars;

//     jest.spyOn(carsService, 'list').mockReturnValue(of(mockCars));

//     component.ngOnInit();

//     expect(carsService.list).toHaveBeenCalled();
//     expect(component.cars).toEqual(mockCars);
//   });

//   it('should format license plate correctly', () => {
//     const plateNumber = 'ABC123';
//     const formattedPlate = component.formatLicensePlate(plateNumber);
//     expect(formattedPlate).toEqual('AB-C1-23');
//   });

//   it('should leave license plate unchanged if not in expected format', () => {
//     const plateNumber = 'ABCD123';
//     const formattedPlate = component.formatLicensePlate(plateNumber);
//     expect(formattedPlate).toEqual(plateNumber);
//   });

//   it('should check if user is admin', () => {
//     // Add expectations based on your logic for isAdmin
//     expect(component.isAdmin()).toBe(true);
//   });

//   // Add more tests as needed
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarsListComponent } from './cars-list.component';
// import { CarsService } from '../cars.service';
// import { of } from 'rxjs';
// import { ICar } from '@cm-nx-workshop/shared/api';
// import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
// import { SidebarComponent } from '../../sidebar/sidebar.component'; // Import your sidebar component

// describe('CarsListComponent', () => {
//   let component: CarsListComponent;
//   let fixture: ComponentFixture<CarsListComponent>;
//   let carsService: CarsService;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const carsServiceMock = {
//       list: jest.fn(),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [CarsListComponent, SidebarComponent],
//       providers: [
//         {
//           provide: CarsService,
//           useValue: carsServiceMock,
//         },
//         AuthService, // Provide AuthService here
//       ],
//       imports: [HttpClientModule, RouterTestingModule], // Add HttpClientModule and RouterTestingModule
//     }).compileComponents();

//     fixture = TestBed.createComponent(CarsListComponent);
//     component = fixture.componentInstance;
//     carsService = TestBed.inject(CarsService);
//     authService = TestBed.inject(AuthService); // Inject AuthService

//     // Override the private property with a mock instance
//     Object.defineProperty(component, 'authService', { value: authService });

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call list method on initialization and set cars', () => {
//     const mockCars: ICar[] = [
//       {
//         id: '1',
//         name: 'Car1',
//         plateNumber: 'ABC123',
//         capacity: 5,
//         mileage: 10000,
//         isAvailable: true,
//         location: {
//           zipCode: '1234XX',
//           street: 'Streetname',
//           city: 'Cityname',
//           number: 4,
//         },
//         imageUrl: 'car1.jpg',
//       },
//     ];

//     // Define component.cars in the class
//     component.cars = mockCars;

//     jest.spyOn(carsService, 'list').mockReturnValue(of(mockCars));

//     component.ngOnInit();

//     expect(carsService.list).toHaveBeenCalled();
//     expect(component.cars).toEqual(mockCars);
//   });

//   it('should format license plate correctly', () => {
//     const plateNumber = 'ABC123';
//     const formattedPlate = component.formatLicensePlate(plateNumber);
//     expect(formattedPlate).toEqual('AB-C1-23');
//   });

//   it('should leave license plate unchanged if not in expected format', () => {
//     const plateNumber = 'ABCD123';
//     const formattedPlate = component.formatLicensePlate(plateNumber);
//     expect(formattedPlate).toEqual(plateNumber);
//   });

//   it('should check if user is admin', () => {
//     // Add expectations based on your logic for isAdmin
//     expect(component.isAdmin()).toBe(true);
//   });

//   // Add more tests as needed
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarsListComponent } from './cars-list.component';
// import { CarsService } from '../cars.service';
// import { Router } from '@angular/router';
// import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
// import { NgZone } from '@angular/core';
// import { of } from 'rxjs';

// describe('CarsListComponent', () => {
//   let component: CarsListComponent;
//   let fixture: ComponentFixture<CarsListComponent>;
//   let carsServiceMock: any;
//   let authServiceMock: any;
//   let routerMock: any;
//   let ngZoneMock: any;

//   beforeEach(() => {
//     carsServiceMock = {
//       list: jest.fn(() => of([])),
//     };

//     authServiceMock = {
//       getCurrentUser: jest.fn(),
//       isAdmin: jest.fn(),
//     };

//     routerMock = {
//       navigate: jest.fn(),
//     };

//     ngZoneMock = {
//       run: (fn: () => void) => fn(),
//     };

//     TestBed.configureTestingModule({
//       declarations: [CarsListComponent],
//       providers: [
//         { provide: CarsService, useValue: carsServiceMock },
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: Router, useValue: routerMock },
//         { provide: NgZone, useValue: ngZoneMock },
//       ],
//     });

//     fixture = TestBed.createComponent(CarsListComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate to home if user is not authenticated', () => {
//     authServiceMock.getCurrentUser.mockReturnValueOnce(null);

//     component.ngOnInit();

//     expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
//   });

//   it('should load cars if user is authenticated', () => {
//     authServiceMock.getCurrentUser.mockReturnValueOnce({ username: 'testUser' });

//     component.ngOnInit();

//     expect(carsServiceMock.list).toHaveBeenCalled();
//   });

//   // Add more tests as needed
// });

import {
  TestBed,
  ComponentFixture,
  waitForAsync,
  inject,
  fakeAsync,
  tick,
  flushMicrotasks,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CarsListComponent } from './cars-list.component';
import { CarsService } from '../cars.service';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';
import { ICar, IUser, UserRole } from '@cm-nx-workshop/shared/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CarsListComponent', () => {
  let component: CarsListComponent;
  let fixture: ComponentFixture<CarsListComponent>;
  let carsService: CarsService;
  let authService: AuthService;

  const mockCars: ICar[] = [
    {
      id: '1',
      name: 'Car1',
      plateNumber: 'ABC123',
      capacity: 5,
      mileage: 10000,
      isAvailable: true,
      location: {
        zipCode: '1234XX',
        street: 'Streetname',
        city: 'Cityname',
        number: 4,
      },
      imageUrl: 'car1.jpg',
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarsListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [CarsService, AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsListComponent);
    component = fixture.componentInstance;
    carsService = TestBed.inject(CarsService);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch and display cars on initialization if the user is authenticated', fakeAsync(() => {
    const mockUser: IUser = {
      name: 'John Doe',
      emailAddress: 'john@example.com',
      role: UserRole.Admin,
    };

    authService.getCurrentUser = jest.fn(() => mockUser);

    carsService.list = jest.fn(() => of(mockCars));

    fixture.detectChanges();
    tick();
    flushMicrotasks();
    fixture.detectChanges();

    expect(component.cars).toEqual(mockCars);
    expect(carsService.list).toHaveBeenCalled();
  }));

  it('should navigate to home page if user is not authenticated on initialization', inject(
    [Router],
    (router: Router) => {
      authService.getCurrentUser = jest.fn(() => null);

      const routerNavigateSpy = jest.spyOn(router, 'navigate');
      jest.spyOn(carsService, 'list').mockReturnValue(of(mockCars));

      fixture.detectChanges();

      expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
      expect(carsService.list).not.toHaveBeenCalled();
    }
  ));

  it('should format license plate correctly', () => {
    const plateNumber = 'ABC123';
    const formattedPlate = component.formatLicensePlate(plateNumber);

    expect(formattedPlate).toEqual('AB-C1-23');
  });

  it('should check if user is an admin', () => {
    authService.isAdmin = jest.fn(() => true);

    const isAdmin = component.isAdmin();

    expect(isAdmin).toBe(true);
    expect(authService.isAdmin).toHaveBeenCalled();
  });
});

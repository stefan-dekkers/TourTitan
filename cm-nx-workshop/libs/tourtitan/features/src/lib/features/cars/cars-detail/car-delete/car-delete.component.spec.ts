// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarDeleteComponent } from './car-delete.component';

// describe('CarDeleteComponent', () => {
//   let component: CarDeleteComponent;
//   let fixture: ComponentFixture<CarDeleteComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CarDeleteComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CarDeleteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
//-------------------------------------------was er al--------------------------------

//cars-delete.component.spec.ts

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarDeleteComponent } from './car-delete.component';

// describe('CarDeleteComponent', () => {
//   let component: CarDeleteComponent;
//   let fixture: ComponentFixture<CarDeleteComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CarDeleteComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CarDeleteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CarDeleteComponent } from './car-delete.component';
// import { CarsService } from '../../cars.service'; // Adjust the path
// import { HttpClientModule } from '@angular/common/http';
// import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModalModule

// describe('CarsDeleteComponent', () => {
//   let component: CarDeleteComponent;
//   let fixture: ComponentFixture<CarDeleteComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CarDeleteComponent],
//       providers: [CarsService, NgbActiveModal], // Provide NgbActiveModal here
//       imports: [HttpClientModule, NgbModalModule], // Include NgbModalModule
//     }).compileComponents();

//     fixture = TestBed.createComponent(CarDeleteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarDeleteComponent } from './car-delete.component';

describe('CarDeleteComponent', () => {
  let component: CarDeleteComponent;
  let fixture: ComponentFixture<CarDeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarDeleteComponent],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmDelete event and close modal on onDelete', () => {
    const confirmDeleteSpy = jest.spyOn(component.confirmDelete, 'emit');
    const closeSpy = jest.spyOn(component.activeModal, 'close');

    component.onDelete();

    expect(confirmDeleteSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });
});

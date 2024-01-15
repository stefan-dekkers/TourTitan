// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserLoginComponent } from './user-login.component';

// describe('UserLoginComponent', () => {
//   let component: UserLoginComponent;
//   let fixture: ComponentFixture<UserLoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UserLoginComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(UserLoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserLoginComponent } from './user-login.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { IUser, UserRole } from '@cm-nx-workshop/shared/api';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let userServiceMock: jest.Mocked<UserService>;

  const mockUsers: IUser[] = [
    {
      id: '1',
      name: 'User1',
      emailAddress: 'user1@example.com',
      role: 'user' as UserRole,
    },
    {
      id: '2',
      name: 'User2',
      emailAddress: 'user2@example.com',
      role: 'admin' as UserRole,
    },
  ];

  beforeEach(() => {
    userServiceMock = {
      list: jest.fn(),
      authenticate: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    });

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on ngOnInit', () => {
    // Arrange
    userServiceMock.list.mockReturnValue(of(mockUsers));

    // Act
    component.ngOnInit();

    // Assert
    expect(userServiceMock.list).toHaveBeenCalled();
    expect(component.user).toEqual(mockUsers);
  });

  it('should call userService.authenticate on authenticate', () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';

    // Act
    component.authenticate(email, password);

    // Assert
    expect(userServiceMock.authenticate).toHaveBeenCalledWith(email, password);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { IUser, UserRole } from '@cm-nx-workshop/shared/api';
import { AuthService } from '../../../../../../auth/src/lib/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceMock: jest.Mocked<UserService>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;
  let activatedRouteMock: ActivatedRoute;

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
    } as unknown as jest.Mocked<UserService>;

    authServiceMock = {
      isAdmin: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    activatedRouteMock = {
      // mock any properties or methods used in the component
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users for admin user on ngOnInit', async () => {
    // Arrange
    authServiceMock.isAdmin.mockReturnValue(true);
    userServiceMock.list.mockReturnValue(of(mockUsers));

    // Act
    await component.ngOnInit();

    // Assert
    expect(userServiceMock.list).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.filteredUsers).toEqual(mockUsers);
  });

  //   it('should redirect to /car for non-admin user on ngOnInit', async () => {
  //     // Arrange
  //     authServiceMock.isAdmin.mockReturnValue(false);

  //     // Act
  //     await component.ngOnInit();

  //     // Assert
  //     expect(routerMock.navigate).toHaveBeenCalledWith(['/car'], {
  //       relativeTo: component.route,
  //     });
  //   });

  // it('should redirect to /car for non-admin user on ngOnInit', async () => {
  //     // Arrange
  //     authServiceMock.isAdmin.mockReturnValue(false);
  //     const navigateSpy = jest.spyOn(routerMock, 'navigate').mockReturnValue(Promise.resolve(true));

  //     // Act
  //     await component.ngOnInit();
  //     fixture.detectChanges(); // Trigger change detection

  //     // Assert
  //     expect(navigateSpy).toHaveBeenCalledWith(['/car'], {
  //       relativeTo: activatedRouteMock, // Use activatedRouteMock instead of component.route
  //     });
  //   });

  it('should filter users based on searchTerm', () => {
    // Arrange
    component.users = mockUsers;

    // Act
    component.searchTerm = 'user1';
    component.filterUsers();

    // Assert
    expect(component.filteredUsers).toEqual([mockUsers[0]]);
  });
});

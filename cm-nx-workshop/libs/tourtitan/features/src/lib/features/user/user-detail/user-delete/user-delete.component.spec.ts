import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteComponent } from './user-delete.component';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDeleteComponent],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmDelete event and close modal on onDelete', () => {
    // Arrange
    jest.spyOn(component.confirmDelete, 'emit');
    jest.spyOn(activeModal, 'close');

    // Act
    component.onDelete();

    // Assert
    expect(component.confirmDelete.emit).toHaveBeenCalled();
    expect(activeModal.close).toHaveBeenCalled();
  });
});

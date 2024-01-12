import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cm-nx-workshop-car-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: [],
})
export class UserDeleteComponent {
  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {}
  onDelete() {
    this.confirmDelete.emit();
    this.activeModal.close();
  }
}

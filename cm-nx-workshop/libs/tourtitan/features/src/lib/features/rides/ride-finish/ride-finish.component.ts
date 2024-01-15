import { Component, EventEmitter, Output } from '@angular/core';
import { IRide } from '@cm-nx-workshop/shared/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cm-nx-workshop-ride-finish',
  templateUrl: './ride-finish.component.html',
})

export class RideFinishComponent {
    ride: IRide | undefined;
  @Output() confirmFinish: EventEmitter<void> = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {}
  onFinish() {
    this.confirmFinish.emit();
    this.activeModal.close();
  }

  formatDateFull(inputDate: Date | undefined): string {
    if (inputDate === undefined) {
      return ''; // or provide a default value or handle accordingly
    }

    const date = new Date(inputDate);
  
    // Ensure the input date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Get date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    // Get time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  
    return formattedDate;
  }
}

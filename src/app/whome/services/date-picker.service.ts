/**
 * @file date-picker.component.ts
 * @author
 * @deprecated this is originally for scheduler component but not used in this website.
 */
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DatePickerService {
  changeType: EventEmitter<any> = new EventEmitter();
  clicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emitDate(value) {
    this.clicked.emit(value);
  }

  emitType(value) {
    this.changeType.emit(value);
  }
}

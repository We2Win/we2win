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

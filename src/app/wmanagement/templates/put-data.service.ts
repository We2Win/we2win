import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PutDataService {
  dataEvent: EventEmitter<any> = new EventEmitter;

  constructor() { }

  updateData(data) {
    this.dataEvent.emit(data);
  }

}

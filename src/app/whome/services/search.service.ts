import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SearchService {
  public dataString: EventEmitter<any> = new EventEmitter;

  constructor() { }

  updateData(data) {
    this.dataString.emit(data);
  }
}

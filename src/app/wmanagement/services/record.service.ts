import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RecordService {
  change: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emitChange(cId, checked) {
    this.change.emit({
      'c-id': cId,
      checked: checked
    });
  }

}

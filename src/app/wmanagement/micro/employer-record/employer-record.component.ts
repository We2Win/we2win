/**
 * @file employer-record.component.ts
 * @author
 * @brief a micro component for employer record in table component.
 */
import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-employer-record',
  templateUrl: './employer-record.component.html',
  styleUrls: ['./employer-record.component.css']
})
export class EmployerRecordComponent implements OnInit {
  @Input('record') record;
  checked = false;

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit() {
  }

  checkBox() {
    this.checked = !this.checked;
    this.recordService.emitChange(this.record['c-id'], this.checked);
  }

}

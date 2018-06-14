/**
 * @file employee-record.component.ts
 * @author
 * @brief a micro component for employee record in table component.
 */
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router/';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-employee-record',
  templateUrl: './employee-record.component.html',
  styleUrls: ['./employee-record.component.css']
})
export class EmployeeRecordComponent implements OnInit {
  @Input('record') record;
  checked = false;

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit() {
    console.log(this.record);
  }

  checkBox() {
    this.checked = !this.checked;
    this.recordService.emitChange(this.record['c-id'], this.checked);
  }

}

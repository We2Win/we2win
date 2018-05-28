import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-employee-record',
  templateUrl: './employee-record.component.html',
  styleUrls: ['./employee-record.component.css']
})
export class EmployeeRecordComponent implements OnInit {
  @Input('record') record;

  constructor() { }

  ngOnInit() {
  }

}

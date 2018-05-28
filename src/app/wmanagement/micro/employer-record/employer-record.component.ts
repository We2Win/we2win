import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employer-record',
  templateUrl: './employer-record.component.html',
  styleUrls: ['./employer-record.component.css']
})
export class EmployerRecordComponent implements OnInit {
  @Input('record') record;

  constructor() { }

  ngOnInit() {
  }

}

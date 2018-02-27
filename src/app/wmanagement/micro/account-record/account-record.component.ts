import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-record',
  templateUrl: './account-record.component.html',
  styleUrls: ['./account-record.component.css']
})
export class AccountRecordComponent implements OnInit {
  recordData: Array<Object> = [
    {
      'value': 'Christian_Red',
      'type': 'id'
    },
    {
      'value': '이유정',
      'type': 'plain'
    },
    {
      'value': 'Christian_red@hanmail.net',
      'type': 'plain'
    },
    {
      'value': 'PLATINUM',
      'type': 'level'
    },
    {
      'value': '999,999',
      'type': 'point'
    },
    {
      'value': '2017.12.31 ~ 2018.12.30',
      'type': 'plain'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

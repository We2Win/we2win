import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-user-record',
  templateUrl: './analysis-user-record.component.html',
  styleUrls: ['./analysis-user-record.component.css']
})
export class AnalysisUserRecordComponent implements OnInit {
  sampleData: Array<Object> = [
    {
      'value': '1',
      'type': '(number)'
    },
    {
      'value': 'Christian_Red',
      'type': 'plain'
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
      'value': 'STANDARD',
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

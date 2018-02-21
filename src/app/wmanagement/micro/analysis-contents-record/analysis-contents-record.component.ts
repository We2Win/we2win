import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-contents-record',
  templateUrl: './analysis-contents-record.component.html',
  styleUrls: ['./analysis-contents-record.component.css']
})
export class AnalysisContentsRecordComponent implements OnInit {
  sampleData: Array<Object> = [
    {
      'value': '1',
      'type': '(number)'
    },
    {
      'value': '부동산 뉴스',
      'type': 'plain'
    },
    {
      'value': '1억 미만',
      'type': 'plain'
    },
    {
      'value': '이주의 핫한 역세권은?',
      'type': 'plain'
    },
    {
      'value': '10',
      'type': 'plain'
    },
    {
      'value': '2018.01.30',
      'type': 'plain'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

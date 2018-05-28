import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analysis-contents-record',
  templateUrl: './analysis-contents-record.component.html',
  styleUrls: ['./analysis-contents-record.component.css']
})
export class AnalysisContentsRecordComponent implements OnInit {
  @Input('record') record;

  constructor(
  ) { }

  ngOnInit() {
  }

}

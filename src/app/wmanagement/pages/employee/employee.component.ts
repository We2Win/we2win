import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { EmployeeRecordComponent } from '../../micro/employee-record/employee-record.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    './employee.component.css',
    '../pages.css'
  ],
  providers: [
    PostingService
  ]
})
export class EmployeeComponent implements OnInit {
  List: Array<object>;
  total: number;

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('sample') sample;
  @ViewChild('popupCsv') popupCsv;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getEmployeeList().subscribe(
      data => {
        this.List = data;
        console.log('list: ', this.List);
        this.total = this.List.length;
        this.addRecord(this.List);
      }
    );
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(EmployeeRecordComponent, records[record]));
    }
  }

  viewPopup() {
    this.popupCsv.showPopup();
  }

  download() {
    const name = 'We2Win_구직_' + (new Date().toISOString().slice(0, 10));
    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(this.List, name);
  }
}

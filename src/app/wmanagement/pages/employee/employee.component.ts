import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RecordService } from '../../services/record.service';
import { AlertService } from '../../services/alert.service';
import { EmployeeRecordComponent } from '../../micro/employee-record/employee-record.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    './employee.component.css',
    '../pages.css'
  ],
  providers: [
    PostingService,
    RecordService
  ]
})
export class EmployeeComponent implements OnInit {
  List: Array<object>;
  selectedList: Array<string> = [];
  total: number;

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('popupCsv') popupCsv;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
    private recordService: RecordService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
    this.recordService.change.subscribe(
      data => {
        if (data.checked) {
          this.selectedList.push(data['c-id']);
        } else {
          // remove c-id from selectedList
          const index = this.selectedList.indexOf(data['c-id']);
          if (index !== -1) {
            this.selectedList.splice(index, 1);
          }
        }
      }
    );
  }

  getList() {
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
    const ref = this.mypostDirective.viewContainerRef;
    ref.clear();
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      this.postingService.loadComponent(ref,
        new PostItem(EmployeeRecordComponent, records[record]));
    }
  }

  confirm() {
    this.contentsService.confirmEmployees(this.selectedList, true).subscribe(
      data => {
        this.alertService.success('승인되었습니다.');
        this.selectedList = [];
        this.getList();
      }
    );
  }

  deny() {
    this.contentsService.confirmEmployees(this.selectedList, false).subscribe(
      data => {
        this.alertService.success('승인 해제되었습니다.');
        this.selectedList = [];
        this.getList();
      }
    );
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

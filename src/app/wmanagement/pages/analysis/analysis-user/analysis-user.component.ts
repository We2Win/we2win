import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PostingService } from '../../../services/posting.service';
import { PostItem } from '../../../models/post-item';
import { TableComponent } from '../../../micro/table/table.component';
import { MypostDirective } from '../../../directives/mypost.directive';
import { AnalysisUserRecordComponent } from '../../../micro/analysis-user-record/analysis-user-record.component';
import { Angular2Csv } from 'angular2-csv';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-analysis-user',
  templateUrl: './analysis-user.component.html',
  styleUrls: [
    './analysis-user.component.css',
    '../../pages.css'
  ],
  providers: [UserService, PostingService]
})
export class AnalysisUserComponent implements OnInit {
  List: any;
  chartData: object;
  total: number;
  date = new Date();
  orderByLevel = 'ALL';
  orderByAmount = 'ALL';

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;
  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('popupCsv') popupCsv;

  postItems: PostItem[];

  constructor(
    private userService: UserService,
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.updateData(this.orderByLevel, this.orderByAmount);
  }

  updateData(level, amount, id?: any) {
    this.userService.getUserList(level, amount, id).subscribe(
      data => {
        this.List = JSON.parse(data.list);
        // console.log(this.List);
        this.total = this.List.length;
        this.addRecord(this.List);
      }
    );
    this.contentsService.getAnalysisContents().subscribe(
      data => {
        console.log('data: ', data);
        this.chartData = data;
      },
      err => {
        console.error('error: ', err);
      }
    );
  }

  searchData(query) {
    this.userService.searchUser(query).subscribe(
      data => {
        this.List = JSON.parse(data.list);
        // console.log(this.List);
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
      // console.log('record: ', records[record]);

      this.postingService.loadComponent(ref,
        new PostItem(AnalysisUserRecordComponent, records[record]));
    }
  }

  viewPopup() {
    this.popupCsv.showPopup();
  }

  changeLevel(event) {
    // console.log('changedLevel: ', event);
    this.orderByLevel = event;
    this.updateData(this.orderByLevel, this.orderByAmount, 1);
  }

  changeAmount(event) {
    // console.log('changedAmount: ', event);
    this.orderByAmount = event;
    this.updateData(this.orderByLevel, this.orderByAmount, 1);
  }

  changeQuery(event) {
    // console.log('changedQuery: ', event.target.value);
    this.searchData(event.target.value);
  }

  sendSMS() {
  }

  sendMail() {

  }

  download() {
    const name = 'We2Win_사용자분석_' + (new Date().toISOString().slice(0, 10)) + '.csv';
    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(this.List, name);
  }
}

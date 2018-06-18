import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountRecordComponent } from '../../micro/account-record/account-record.component';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: [
    './account.component.css',
    '../pages.css'
  ],
  providers: [UserService, PostingService]
})
export class AccountComponent implements OnInit {
  List: any;
  total: number;
  orderByLevel = 'ALL';
  orderByAmount = 'ALL';

  categoryName = [{
    'u-id': '아이디',
    'name': '이름',
    'email': '이메일',
    'level': '등급',
    'point': '포인트',
    'level-start': '사용 시작일',
    'level-end': '사용 종료일',
    'amount': '가용 자산'
  }];

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('popupCsv') popupCsv;

  postItems: PostItem[];

  constructor(
    private userService: UserService,
    private postingService: PostingService,
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
        new PostItem(AccountRecordComponent, records[record]));
    }
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
    const name = 'We2Win_계정관리_' + (new Date().toISOString().slice(0, 10));
    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(Object.assign(this.categoryName, this.List), name);
  }
}

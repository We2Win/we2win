import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountRecordComponent } from '../../micro/account-record/account-record.component';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: [
    './account.component.css',
    '../pages.css'
  ],
  providers: [
    UserService,
    PostingService,
    RecordService
  ],
})
export class AccountComponent implements OnInit {
  List: any;
  total: number;
  selectedList: Array<string> = [];
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
    private recordService: RecordService,
  ) { }

  ngOnInit() {
    this.updateData(this.orderByLevel, this.orderByAmount);
    this.recordService.change.subscribe(
      data => {
        console.log('data: ', data);
        if (data.checked) {
          this.selectedList.push(data['c-id']);
        } else {
          // remove c-id from selectedList
          const index = this.selectedList.indexOf(data['c-id']);
          if (index !== -1) {
            this.selectedList.splice(index, 1);
          }
        }
      },
      err => {
        console.error('error occurred: ', err);
      }
    );
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
    const name = 'We2Win_계정관리_' + (new Date().toISOString().slice(0, 10)) + '.csv';
    // tslint:disable-next-line:no-unused-expression
    Array.prototype.push.apply(this.categoryName, this.List);
    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(this.categoryName, name);
  }
}

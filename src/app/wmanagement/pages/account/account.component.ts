import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
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
export class AccountComponent implements OnInit, AfterViewInit {
  List: Array<object>;
  total: number;

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('sample') sample;
  @ViewChild('popupCsv') popupCsv;

  postItems: PostItem[];

  constructor(
    private userService: UserService,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {
        this.List = JSON.parse(data.list);
        console.log(this.List);
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
        new PostItem(AccountRecordComponent, records[record]));
    }
  }

  ngAfterViewInit() {
  }

  viewPopup() {
    this.popupCsv.showPopup();
  }

  sendSMS() {

  }

  sendMail() {

  }

  download(type) {
    switch (type) {
      case 'all':
        const data = [
          {
            name: 'Test 1',
            age: 13,
            average: 8.2,
            approved: true,
            description: 'using Content here, content here '
          },
          {
            name: 'Test 2',
            age: 11,
            average: 8.2,
            approved: true,
            description: 'using Content here, content here '
          },
          {
            name: 'Test 4',
            age: 10,
            average: 8.2,
            approved: true,
            description: 'using Content here, content here '
          },
        ];

        // tslint:disable-next-line:no-unused-expression
        new Angular2Csv(data, 'My Report');
      break;
    }
  }
}

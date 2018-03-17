import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountRecordComponent } from '../../micro/account-record/account-record.component';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';

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

  postItems: PostItem[];

  constructor(
    private userService: UserService,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {
        this.List = JSON.parse(data.list);
        this.total = this.List.length;
        this.addRecord(this.List);
      }
    );
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      // this.postItems.push(new PostItem(AccountRecordComponent, records[record]));
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
      // this.postingService.loadComponent(this.tableComponent.viewContainerRef,
        new PostItem(AccountRecordComponent, records[record]));
      // console.log('loaded.');
    }

    // tslint:disable-next-line:forin
    // for (const item in this.postItems) {
      // this.postingService.loadComponent(this.tableComponent.viewContainerRef, this.postItems[item]);
    // }
  }

  ngAfterViewInit() {
    // this.postItems = [
    //   new PostItem(AccountRecordComponent, { ID: 'testing' }),
    //   new PostItem(AccountRecordComponent, { ID: 'testing' }),
    //   new PostItem(AccountRecordComponent, { ID: 'testing' }),
    //   new PostItem(AccountRecordComponent, { ID: 'testing' }),
    // ];

    // this.postingService.loadComponent(this.tableComponent.viewContainerRef, this.postItems[0]);
  }
}

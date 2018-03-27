import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PostingService } from '../../../services/posting.service';
import { PostItem } from '../../../models/post-item';
import { TableComponent } from '../../../micro/table/table.component';
import { MypostDirective } from '../../../directives/mypost.directive';
import { AnalysisUserRecordComponent } from '../../../micro/analysis-user-record/analysis-user-record.component';

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
  List: Array<object>;
  total: number;
  date = new Date();

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

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
      records[record]['no'] = parseInt(record, 10) + 1;
      console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(AnalysisUserRecordComponent, records[record]));
    }
  }
}

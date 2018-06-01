import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { TableComponent } from '../../micro/table/table.component';
import { MypostDirective } from '../../directives/mypost.directive';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ContentsService } from '../../services/contents.service';
import { TrackingRecordComponent } from '../../micro/tracking-record/tracking-record.component';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: [
    './tracking.component.css',
    '../pages.css'
  ],
  providers: [UserService, PostingService]
})
export class TrackingComponent implements OnInit {
  List: any;
  total: number;
  orderByLevel = 'ALL';
  orderByAmount = 'ALL';

  date = new Date().getFullYear() + '. ' + new Date().getMonth();

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('popupCsv') popupCsv;

  postItems: PostItem[];

  constructor(
    private userService: UserService,
    private contentService: ContentsService,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
    this.updateData(this.orderByLevel, this.orderByAmount);
  }

  updateData(level, amount, id?: any) {
    this.contentService.getEmployeeList().subscribe(
      data => {
        this.List = data;
        console.log(this.List);
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
        new PostItem(TrackingRecordComponent, records[record]));
    }
  }
}

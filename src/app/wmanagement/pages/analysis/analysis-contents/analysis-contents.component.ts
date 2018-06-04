import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
import { PostingService } from '../../../services/posting.service';
import { PostItem } from '../../../models/post-item';
import { TableComponent } from '../../../micro/table/table.component';
import { MypostDirective } from '../../../directives/mypost.directive';
import { AnalysisContentsRecordComponent } from '../../../micro/analysis-contents-record/analysis-contents-record.component';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-analysis-contents',
  templateUrl: './analysis-contents.component.html',
  styleUrls: [
    './analysis-contents.component.css',
    '../../pages.css'
  ],
  providers: [ContentsService, PostingService]
})
export class AnalysisContentsComponent implements OnInit {
  List: any;
  total: number;
  date = new Date();
  orderByLevel = 'ALL';
  orderByAmount = 'ALL';

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
    this.updateData(this.orderByLevel, this.orderByAmount);
  }

  updateData(level, amount, id?: any) {
    this.contentsService.getContentsList(level, amount, id).subscribe(
      data => {
        this.List = JSON.parse(data.list);
        console.log(this.List);
        this.total = this.List.length;
        this.addRecord(this.List);
      }
    );
  }

  searchData(query) {
    this.contentsService.searchContents(query).subscribe(
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
        new PostItem(AnalysisContentsRecordComponent, records[record]));
    }
  }

  changeLevel(event) {
    console.log('changedLevel: ', event);
    this.orderByLevel = event;
    this.updateData(this.orderByLevel, this.orderByAmount, 1);
  }

  changeAmount(event) {
    console.log('changedAmount: ', event);
    this.orderByAmount = event;
    this.updateData(this.orderByLevel, this.orderByAmount, 1);
  }

  changeQuery(event) {
    console.log('changedQuery: ', event.path[0].value);
    this.searchData(event.path[0].value);
  }

}

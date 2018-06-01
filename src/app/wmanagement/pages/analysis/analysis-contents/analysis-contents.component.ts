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

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('report', 'newly', 'date').subscribe(
      data => {
        this.List = data;
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
}

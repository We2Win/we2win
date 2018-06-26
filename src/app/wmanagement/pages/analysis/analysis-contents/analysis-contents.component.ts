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
  chartData = {
    'c-click': [],
    'c-scrap': [],
    'c-comments': [],
    'c-sns': []
  };

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
    this.updateData(this.orderByLevel, this.orderByAmount, 1);
  }

  updateData(level, amount, id?: any) {
    console.log('updating..');
    this.contentsService.getContentsListByFiltering(level, amount, id).subscribe(
      data => {
        this.List = data;
        // console.log(this.List);
        this.total = this.List.length;
        this.addRecord(JSON.parse(this.List.list));
      }
    );
    this.contentsService.getAnalysisContents().subscribe(
      data => {
        // console.log('data: ', data);
        // tslint:disable-next-line:forin
        for (const atr in this.chartData) {
          this.chartData[atr] = data[atr];
        }
      },
      err => {
        console.error('error: ', err);
      }
    );
  }

  searchData(query) {
    this.contentsService.searchContents(query).subscribe(
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

    console.log(records);
    // tslint:disable-next-line:forin
    // records['list'] = JSON.parse(records['list']);
    const List = records;
    // tslint:disable-next-line:forin
    for (const record in List) {
      // console.log(List[record]);
      List[record]['no'] = parseInt(record, 10) + 1;
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(AnalysisContentsRecordComponent, List[record]));
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

}

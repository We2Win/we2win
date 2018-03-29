import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';
import { RankingpostDirective } from '../../../directives/rankingpost.directive';

@Component({
  selector: 'app-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.css'],
  providers: [ContentsService, PostingService]
})

export class InfoMainComponent implements OnInit {
  WeeklyList: Array<object>;
  RankingList: Array<object>;
  @Input() recentRecords;
  @Input() weeklyRecords;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild(RankingpostDirective)
  private rankingpostDirective: RankingpostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getReportList().subscribe(
      data => {
        if (data.list) {
          // console.log(data);
          this.WeeklyList = JSON.parse(data.list);
          this.addNewlyRecord(this.WeeklyList);
        }
      }
    );
    this.contentsService.getReportList().subscribe(
      data => {
        if (data.list) {
          this.RankingList = JSON.parse(data.list);
          this.addRankingRecord(this.RankingList);
        }
      }
    );
  }

  addNewlyRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(InfoCardComponent, records[record]));
    }
  }

  addRankingRecord(records) {
    let count = ['first', 'second', 'third'];
    // tslint:disable-next-line:forin
    for (const record in records) {
      records[record]['rank'] = count[record];
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.rankingpostDirective.viewContainerRef,
        new PostItem(InfoCardComponent, records[record]));
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Rankingpost1Directive, Rankingpost2Directive, Rankingpost3Directive } from '../../../directives/rankingpost.directive';
import { PostItem } from '../../../models/post-item';
import { PostingService } from '../../../services/posting.service';
import { ContentsService } from '../../../services/contents.service';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';
import { NewsCardComponent } from '../../../micro/news-card/news-card.component';
import { LawCardComponent } from '../../../micro/law-card/law-card.component';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [ContentsService, PostingService]
})
export class WeeklyComponent implements OnInit {
  @ViewChild(Rankingpost1Directive)
  private rankingpost1Directive: Rankingpost1Directive;
  @ViewChild(Rankingpost2Directive)
  private rankingpost2Directive: Rankingpost2Directive;
  @ViewChild(Rankingpost3Directive)
  private rankingpost3Directive: Rankingpost3Directive;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('info/report', 1).subscribe(
      data => {
        if (data) {
          // console.log('report: ', data);
          this.addReportRecord(data);
        }
      }
    );
    this.contentsService.getContentsList('info/news', 1).subscribe(
      data => {
        if (data) {
          // console.log('news: ', data);
          this.addNewsRecord(data);
        }
      }
    );
    this.contentsService.getContentsList('info/law', 1).subscribe(
      data => {
        if (data) {
          console.log('law: ', data);
          this.addLawRecord(data);
        }
      }
    );
  }

  addReportRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpost1Directive.viewContainerRef,
          new PostItem(InfoCardComponent, records[num]));
      }
    }
  }

  addNewsRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
          new PostItem(NewsCardComponent, records[num]));
      }
    }
  }

  addLawRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num]; // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpost3Directive.viewContainerRef,
          new PostItem(LawCardComponent, records[num]));
      }
    }
  }

}

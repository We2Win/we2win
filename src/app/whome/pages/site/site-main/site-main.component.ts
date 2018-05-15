import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { PostItem } from '../../../models/post-item';
import { SiteCardComponent } from '../../../micro/site-card/site-card.component';
import { Rankingpost1Directive, Rankingpost2Directive, Rankingpost3Directive } from '../../../directives/rankingpost.directive';

@Component({
  selector: 'app-site-main',
  templateUrl: './site-main.component.html',
  styleUrls: ['./site-main.component.css'],
  providers: [ContentsService, PostingService]
})
export class SiteMainComponent implements OnInit {
  NewlyList: Array<object>;
  WeeklyList: Array<object>;
  List: Array<object>;

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
    this.contentsService.getContentsList('site/newly', 1).subscribe(
      data => {
        if (data) {
          console.log('Newly List: ', data);
          this.NewlyList = data;
          this.addNewlyRecord(this.NewlyList);
          // this.addSampleRecord(this.NewlyList);
        }
      }
    );

    // this.contentsService.getContentsList('site/weekly', 1).subscribe(
    //   data => {
    //     if (data) {
    //       console.log('Weekly List: ', data);
    //       this.WeeklyList = data;
    //       this.addWeeklyRecord(this.WeeklyList);
    //     }
    //   }
    // );
  }

  addNewlyRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.rankingpost1Directive.viewContainerRef,
        new PostItem(SiteCardComponent, records[record]));
    }
  }

  addSampleRecord(records) {
    this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
      new PostItem(SiteCardComponent, records[0]));
    this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
      new PostItem(SiteCardComponent, records[1]));
    this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
      new PostItem(SiteCardComponent, records[2]));
    this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
      new PostItem(SiteCardComponent, records[3]));
  }

  addWeeklyRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpost3Directive.viewContainerRef,
          new PostItem(SiteCardComponent, records[num]));
      }
    }
  }

}

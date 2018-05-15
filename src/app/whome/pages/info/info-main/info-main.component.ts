import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';
import { Rankingpost1Directive, Rankingpost2Directive } from '../../../directives/rankingpost.directive';
import { NewsCardComponent } from '../../../micro/news-card/news-card.component';
import { LawCardComponent } from '../../../micro/law-card/law-card.component';

@Component({
  selector: 'app-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.css'],
  providers: [ContentsService, PostingService]
})

export class InfoMainComponent implements OnInit {
  NewlyList: Array<object>;
  WeeklyList: Array<object>;

  newlyPageNum;
  @ViewChild('newlyContainer') newlyContainer;

  @ViewChild(Rankingpost1Directive)
  private rankingpost1Directive: Rankingpost1Directive;

  @ViewChild(Rankingpost2Directive)
  private rankingpost2Directive: Rankingpost2Directive;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.getContentsListNewly(1);
    this.getContentsListWeekly();
  }

  getContentsListNewly(page) {
    this.contentsService.getContentsList('info/newly', page).subscribe(
      data => {
        if (data) {
          console.log('data: ', data);
          const list = [];
          data.forEach(content => {
            list.push(content);
          });
          list.forEach(content => {
            content['createdAt'] = new Date(content['createdAt']);
            content['updatedAt'] = new Date(content['createdAt']);
          });

          // const compare = (a, b) => {
          //   if (a.updatedAt < b.updatedAt) {
          //     return -1;
          //   }
          //   if (a.updatedAt > b.updatedAt) {
          //     return 1;
          //   }
          //   return 0;
          // };

          // list.sort(compare);
          console.log('Newly List: ', list);
          this.NewlyList = list;
          this.newlyPageNum = parseInt((this.NewlyList.length - 1) / 8 + 1 + '', 10);
          this.addNewlyRecord(this.NewlyList);
        }
      }
    );
  }

  getContentsListWeekly() {
    this.contentsService.getContentsList('info/weekly', 1).subscribe(
      data => {
        if (data) {
          const list = [];
          data.forEach(content => {
              list.push(content);
          });
          list.forEach(content => {
            content['createdAt'] = new Date(content['createdAt']);
            content['updatedAt'] = new Date(content['createdAt']);
          });
          console.log('Weekly List: ', list);
          this.WeeklyList = list;
          this.addWeeklyRecord(this.WeeklyList);
        }
      }
    );
  }

  paging(count) {
    // console.log(count);
    const container = this.rankingpost1Directive.viewContainerRef;
    container.clear();
    const start = count * 8;
    this.addNewlyRecord(this.NewlyList.slice(start, start + 8));
  }

  addNewlyRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      if (records[record]['c-type'] === '리포트') {
        this.postingService.loadComponent(this.rankingpost1Directive.viewContainerRef,
          new PostItem(InfoCardComponent, records[record]));
      } else if (records[record]['c-type'] === '부동산 뉴스') {
        this.postingService.loadComponent(this.rankingpost1Directive.viewContainerRef,
          new PostItem(NewsCardComponent, records[record]));
      } else if (records[record]['c-type'] === '법률 및 정책') {
        this.postingService.loadComponent(this.rankingpost1Directive.viewContainerRef,
          new PostItem(LawCardComponent, records[record]));
      }
    }
  }

  addWeeklyRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        if (records[num]['report']) {
          this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
            new PostItem(InfoCardComponent, records[num]));
        } else if (records[num]['main-title']) {
          this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
            new PostItem(NewsCardComponent, records[num]));
        } else if (records[num]['file']) {
          this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
            new PostItem(LawCardComponent, records[num]));
        }
      }
    }
  }
}

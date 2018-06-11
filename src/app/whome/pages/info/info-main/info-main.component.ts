import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';
import { Rankingpost1Directive, Rankingpost2Directive } from '../../../directives/rankingpost.directive';
import { NewsCardComponent } from '../../../micro/news-card/news-card.component';
import { LawCardComponent } from '../../../micro/law-card/law-card.component';
import { environment } from '../../../../../environments/environment';
import { NaverService } from '../../../services/naver.service';

@Component({
  selector: 'app-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.css'],
  providers: [ContentsService, PostingService]
})

export class InfoMainComponent implements OnInit {
  WeeklyList: any;
  sortType = 'date';
  hasMoreContents = true;

  @ViewChild(Rankingpost1Directive)
  private rankingpost1Directive: Rankingpost1Directive;

  @ViewChild(Rankingpost2Directive)
  private rankingpost2Directive: Rankingpost2Directive;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
    private naverService: NaverService
  ) { }

  ngOnInit() {
    this.getContentsListNewly(this.sortType, 1);
    this.getContentsListWeekly();
  }

  getContentsListNewly(sort, id?: any) {
    this.contentsService.getContentsList('info', 'newly', sort, id).subscribe(
      data => {
        if (data) {
          if (data['length'] === 0) {
            this.hasMoreContents = false;
            return;
          } if (data['length'] !== 8) {
            this.hasMoreContents = false;
          } else {
            this.hasMoreContents = true;
          }
          console.log('data: ', data);
          const list = [];
          // tslint:disable-next-line:forin
          for (const i in data) {
            list.push(data[i]);
          }
          // data.forEach(content => {
          //   list.push(content);
          // });
          list.forEach(content => {
            content['createdAt'] = new Date(content['createdAt']);
            content['updatedAt'] = new Date(content['createdAt']);
          });
          this.addNewlyRecord(list);
        }
      }
    );
  }

  getContentsListWeekly() {
    this.contentsService.getRankingList('info', new Date().toISOString().slice(0, 10)).subscribe(
    // this.contentsService.getWeeklyList('info').subscribe(
      data => {
        console.log('data: ', data);
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

  paging(page) {
    // console.log('page: ', page);
    const container = this.rankingpost1Directive.viewContainerRef;
    container.clear();
    // this.addNewlyRecord(this.NewlyList.slice(start, start + 8));
    this.getContentsListNewly(this.sortType, page);
  }

  sort(type) {
    const sortName = {
      '최근순': 'date',
      '클릭수': 'click',
      '댓글수': 'reply',
      '공유횟수': 'sns',
      '스크랩': 'scrap'
    };

    this.sortType = sortName[type];

    const container = this.rankingpost1Directive.viewContainerRef;
    container.clear();
    this.getContentsListNewly(this.sortType, 1);
  }

  addNewlyRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
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
        console.log('records[num]: ', records[num]);
        records[num]['rank'] = count[num];
        if (records[num]['c-type'] === '리포트') {
          this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
            new PostItem(InfoCardComponent, records[num]));
        } else if (records[num]['c-type'] === '부동산 뉴스') {
          this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
            new PostItem(NewsCardComponent, records[num]));
        } else if (records[num]['c-type'] === '법률 및 정책') {
          this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
            new PostItem(LawCardComponent, records[num]));
        }
      }
    }
  }
}

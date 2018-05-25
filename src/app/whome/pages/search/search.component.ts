import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { PostingService } from '../../services/posting.service';
import { MypostDirective } from '../../directives/mypost.directive';
import { PostItem } from '../../models/post-item';
import { NewsCardComponent } from '../../micro/news-card/news-card.component';
import { SearchService } from '../../services/search.service';
import { LawCardComponent } from '../../micro/law-card/law-card.component';
import { SiteCardComponent } from '../../micro/site-card/site-card.component';
import { InfoCardComponent } from '../../micro/info-card/info-card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ContentsService, PostingService]
})
export class SearchComponent implements OnInit {
  List: Array<object>;
  sortType = 'date';
  hasMoreContents = true;


  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.getDataString().subscribe(
      data => {
        console.log('data success on search component: ', data);
        if (data) {
          const container = this.mypostDirective.viewContainerRef;
          container.clear();
          this.addRecord(data);
          if (data.length !== 8) {
            this.hasMoreContents = false;
          }
        }
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  paging(page) {
    console.log('page: ', page);
    const container = this.mypostDirective.viewContainerRef;
    // this.searchService.searchBySort(this.sortType, page);
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

    const container = this.mypostDirective.viewContainerRef;
    container.clear();
    // this.searchService.searchBySort(this.sortType, 1);
  }

  addRecord(records) {
    const components = {
      '리포트': InfoCardComponent,
      '부동산 뉴스': NewsCardComponent,
      '법률 및 정책': LawCardComponent,
      '아파트': SiteCardComponent,
      '오피스텔': SiteCardComponent,
      '상가/호텔': SiteCardComponent,
      '토지': SiteCardComponent,
    };
    // tslint:disable-next-line:forin
    for (const record in records) {
      console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(components[records[record]['c-type']], records[record]));
    }
  }
}

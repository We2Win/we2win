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
  List: any;
  hasMoreContents = true;
  Data;
  isEmpty = false;
  reset = false;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('searchList') searchList;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.getDataString().subscribe(
      data => {
        this.Data = data.body;
        const container = this.mypostDirective.viewContainerRef;

        console.log('data: ', data);
        if (this.Data) {
          if (data['length']) {
            this.isEmpty = false;
            if (data.page === 1) {
              container.clear();
              this.resetPage();
              this.hasMoreContents = true;
            }

            this.addRecord(this.Data);
            if (data['length'] !== 8) {
              this.hasMoreContents = false;
            }
          } else {
            container.clear();
            this.isEmpty = true;
          }
        } else {
          container.clear();
          this.isEmpty = true;
        }
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  paging(page) {
    console.log('page: ', page);
    this.searchService.searchByPage(page);
  }

  resetPage() {
    this.searchList.resetPage(1);
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
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(components[records[record]['c-type']], records[record]));
    }
  }
}

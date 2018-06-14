/**
 * @file apartment.component.ts
 * @author
 * @brief a content list page of apartment. (/site/apartment)
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { SiteCardComponent } from '../../../micro/site-card/site-card.component';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css'],
  providers: [ContentsService, PostingService]
})
export class ApartmentComponent implements OnInit {
  Data: any;
  sortType = 'date';
  hasMoreContents = true;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.getContentsList(this.sortType, 1);
  }

  getContentsList(sort, id?: any) {
    this.contentsService.getContentsList('apartment', 'newly', sort, id).subscribe(
      data => {
        if (data) {
          console.log('data: ', data);
          this.Data = data;
          this.addRecord(this.Data);
          if (data['length'] !== 8) {
            this.hasMoreContents = false;
          }
        }
      }
    );
  }

  paging(page) {
    console.log('page: ', page);
    const container = this.mypostDirective.viewContainerRef;
    this.getContentsList(this.sortType, page);
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
    this.getContentsList(this.sortType, 1);
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(SiteCardComponent, records[record]));
    }
  }
}

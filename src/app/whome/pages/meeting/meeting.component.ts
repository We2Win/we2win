import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { PostingService } from '../../services/posting.service';
import { PostItem } from '../../models/post-item';
import { MeetingCardComponent } from '../../micro/meeting-card/meeting-card.component';
import { MypostDirective } from '../../directives/mypost.directive';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
  providers: [ContentsService, PostingService]
})

export class MeetingComponent implements OnInit {
  Data: Array<object>;
  sortType = 'date';
  hasMoreContents = true;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.getSimplesListNewly(this.sortType, 1);
  }

  getSimplesListNewly(sort, id?: any) {
    this.contentsService.getSimplesList('meeting', sort, id).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.Data = data;
          this.addRecord(this.Data);
          if (data.length !== 8) {
            this.hasMoreContents = false;
          }
        }
      }
    );
  }

  paging(page) {
    console.log('page: ', page);
    const container = this.mypostDirective.viewContainerRef;
    this.getSimplesListNewly(this.sortType, page);
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
    this.getSimplesListNewly(this.sortType, 1);
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(MeetingCardComponent, records[record]));
    }
  }
}

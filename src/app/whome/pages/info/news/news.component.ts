import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { NewsCardComponent } from '../../../micro/news-card/news-card.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ContentsService, PostingService]
})
export class NewsComponent implements OnInit {
  List: Array<object>;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getNewsList().subscribe(
      data => {
        // console.log(data);
        this.List = JSON.parse(data.list);
        this.addRecord(this.List);
      }
    );
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(NewsCardComponent, records[record]));
    }
  }

}

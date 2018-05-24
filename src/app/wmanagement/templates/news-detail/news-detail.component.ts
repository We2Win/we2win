import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostingService } from '../../services/posting.service';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { PutDataService } from '../put-data.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [PostingService]
})
export class NewsDetailComponent implements OnInit {
  Data = new News();
  id: number;
  @ViewChild('background') background;
  @ViewChild('top') top;

  // @ViewChild(RankingpostDirective)
  // private rankingpostDirective: RankingpostDirective;

  RankingList;

  constructor(
    private route: ActivatedRoute,
    private postingService: PostingService,
    private putDataService: PutDataService,
    private meta: Meta
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    this.putDataService.dataNews.subscribe(
      data => {
        this.Data = data;
        this.updateDetail();
      }
    );

    // this.contentsService.getWeeklyList('news').subscribe(
    //   data => {
    //     if (data) {
    //       this.RankingList = data;
    //       this.addRankingRecord(this.RankingList);
    //     }
    //   }
    // );
  }

  updateDetail() {
    // this.top.nativeElement.style.background = 'red';
    this.background.nativeElement.src = environment.bucket.downloadUrl + this.Data['slave-image1'];
    // this.top.nativeElement.style.backgroundSize = 'cover';
    // this.top.nativeElement.style.backgroundPosition = 'center';
    console.log('data: ', this.Data);

    this.meta.addTag({ name: 'og:url', content: 'we2win.com' });
    this.meta.addTag({ name: 'og:title', content: this.Data['title'] });
    this.meta.addTag({ name: 'og:description', content: this.Data['summary'] });
  }

  // addRankingRecord(records) {
  //   const count = ['first', 'second', 'third'];
  //   for (const num in count) {
  //     if (records[num]) {
  //       records[num]['rank'] = count[num];
  //       // console.log('record: ', records[record]);
  //       this.postingService.loadComponent(this.rankingpostDirective.viewContainerRef,
  //         new PostItem(NewsCardComponent, records[num]));
  //     }
  //   }
  // }
}

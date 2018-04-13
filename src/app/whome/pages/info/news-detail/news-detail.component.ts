import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { RankingpostDirective } from '../../../directives/rankingpost.directive';
import { NewsCardComponent } from '../../../micro/news-card/news-card.component';
import { PostingService } from '../../../services/posting.service';
import { PostItem } from '../../../models/post-item';
import { AuthService } from '../../../services/auth.service';
import { News } from '../../../models/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [ContentsService, PostingService, AuthService]
})
export class NewsDetailComponent implements OnInit {
  Data: object = new News();
  id: number;
  @ViewChild('background') background;
  @ViewChild('top') top;

  @ViewChild(RankingpostDirective)
  private rankingpostDirective: RankingpostDirective;

  RankingList;

  constructor(
    private contentsService: ContentsService,
    private route: ActivatedRoute,
    private postingService: PostingService,
    private auth: AuthService
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    this.contentsService.getNewsList(this.id).subscribe(
      data => {
        if (data) {
          this.Data = JSON.parse(data.body);
          // this.top.nativeElement.style.background = 'red';
          this.background.nativeElement.src = environment.bucket.downloadUrl + this.Data['N-image'];
          // this.top.nativeElement.style.backgroundSize = 'cover';
          // this.top.nativeElement.style.backgroundPosition = 'center';
          console.log(this.Data);
        }
        if (data.list) {
          this.RankingList = JSON.parse(data.list);
          console.log('list: ', this.RankingList);
          this.addRankingRecord(this.RankingList);
        }
      }
    );
  }

  addRankingRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpostDirective.viewContainerRef,
          new PostItem(NewsCardComponent, records[num]));
      }
    }
  }

}

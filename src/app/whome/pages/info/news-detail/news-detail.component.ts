/**
 * @file news-detail.component.ts
 * @author
 * @brief a page for news detail. (/info/news/:id)
 */
import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { RankingpostDirective } from '../../../directives/rankingpost.directive';
import { NewsCardComponent } from '../../../micro/news-card/news-card.component';
import { PostingService } from '../../../services/posting.service';
import { PostItem } from '../../../models/post-item';
import { AuthService } from '../../../services/auth.service';
import { News } from '../../../models/news';
import { Meta } from '@angular/platform-browser';
import { FbShareService } from '../../../services/fb-share.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';

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
  isBookmarked;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef,
    private alertService: AlertService,
    private contentsService: ContentsService,
    private userService: UserService,
    private fbShareService: FbShareService,
    private route: ActivatedRoute,
    private postingService: PostingService,
    private authService: AuthService,
    private meta: Meta
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = this.route.params['value'].id;
      this.updateDetail();
    });

    this.contentsService.getWeeklyList('news').subscribe(
      data => {
        if (data) {
          this.RankingList = data;
          this.addRankingRecord(this.RankingList);
        }
      }
    );
  }

  updateDetail() {
    this.contentsService.getContentsDetail('news', this.id).subscribe(
      data => {
        if (data) {
          this.Data = data;
          this.Data['c-type'] = '부동산 뉴스';
          // this.top.nativeElement.style.background = 'red';
          this.background.nativeElement.src = environment.bucket.downloadUrl + this.Data['slave-image1'];
          // this.top.nativeElement.style.backgroundSize = 'cover';
          // this.top.nativeElement.style.backgroundPosition = 'center';
          console.log('data: ', this.Data);

          this.isBookmarked = this.Data['isBookmarked'];

          this.meta.addTag({ name: 'og:url', content: 'we2win.com' });
          this.meta.addTag({ name: 'og:title', content: this.Data['title'] });
          this.meta.addTag({ name: 'og:description', content: this.Data['summary'] });
        }
      }
    );
  }

  showMore(child) {
    child._elementRef.nativeElement.classList.add('show');
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

  bookmark() {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error('로그인 하셔야 북마크 하실 수 있습니다.');
    }
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (this.isBookmarked) {
      this.isBookmarked = false;
      this.alertService.warn('북마크가 해제되었습니다.');
      this.userService.removeBookmark(this.Data);
    } else {
      this.isBookmarked = true;
      this.alertService.success('북마크가 설정되었습니다.');
      this.userService.addBookmark(this.Data);
    }
  }

  fbShare() {
    this.fbShareService.share(environment.homeUrl + '/site/news/' + this.Data['no'], this.Data['c-id']);
  }

}

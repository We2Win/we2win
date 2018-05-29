import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from '../../../services/posting.service';
import { RankingpostDirective } from '../../../directives/rankingpost.directive';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { Site } from '../../../models/site';
import { environment } from '../../../../../environments/environment';
import { ChartComponent } from '../../../micro/chart/chart.component';
import { AuthService } from '../../../services/auth.service';
import { SiteCardComponent } from '../../../micro/site-card/site-card.component';
import { AlertService } from '../../../services/alert.service';
import { UserInfo } from '../../../models/userInfo';
import { FbShareService } from '../../../services/fb-share.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css'],
  providers: [ContentsService, PostingService]
})
export class SiteDetailComponent implements OnInit {
  Data = new Site();
  id: number;
  imgUrl;
  subImgUrl = ['', '', '', '', ''];
  selectedImgUrl = '';
  selectedNum = 1;
  showCharts = true;
  showMoreReport = false;
  isBookmarked = false;

  userInfo = new UserInfo();
  // userInfo;
  comments = [];

  @ViewChild('NewComment') NewComment;
  @ViewChild('reportDetail') reportDetail;
  @ViewChild('imgNavigator') imgNavigator;

  WeeklyList: Array<object>;
  RankingList: Array<object>;
  @Input() recentRecords;
  @Input() weeklyRecords;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild(RankingpostDirective)
  private rankingpostDirective: RankingpostDirective;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef,
    private contentsService: ContentsService,
    private postingService: PostingService,
    private userService: UserService,
    private authService: AuthService,
    private fbShareService: FbShareService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    // When routed to another site contents:
    this.route.params.subscribe(params => {
      this.id = this.route.params['value'].id;
      this.showMoreReport = false;
      window.scrollTo(0, 0);
      this.updateDetail();
    });
    // To get ranking report list.
    this.contentsService.getWeeklyList('site').subscribe(
      data => {
        if (data) {
          this.RankingList = data;
          this.addRankingRecord(this.RankingList);
        }
      }
    );

    if (this.authService.isAuthenticated()) {
      this.userInfo = this.authService.getUserInfo();
    }
  }

  updateDetail() {
    this.contentsService.getContentsDetail('site', this.id).subscribe(
      data => {
        if (data) {
          this.Data = data;
          console.log(this.Data);
          if (this.Data['current-duration1'] || this.Data['around-duration1']) {
            this.showCharts = true;
            this.addChart();
          } else {
            this.showCharts = false;
          }

          this.imgUrl = environment.bucket.downloadUrl + this.Data['master-image'];
          this.subImgUrl[1] = environment.bucket.downloadUrl + this.Data['slave-image1'];
          this.subImgUrl[2] = environment.bucket.downloadUrl + this.Data['slave-image2'];
          this.subImgUrl[3] = environment.bucket.downloadUrl + this.Data['slave-image3'];
          this.subImgUrl[4] = environment.bucket.downloadUrl + this.Data['slave-image4'];
          this.subImgUrl[5] = environment.bucket.downloadUrl + this.Data['slave-image5'];
          this.selectedImgUrl = environment.bucket.downloadUrl + this.Data['slave-image1'];

          console.log('data: ', this.Data);

          this.meta.addTag({ name: 'og:url', content: 'we2win.com' });
          this.meta.addTag({ name: 'og:title', content: this.Data['title'] });
          this.meta.addTag({ name: 'og:description', content: this.Data['summary'] });
          this.meta.addTag({ name: 'og:image', content: this.imgUrl });

          this.getComments();
        }
      }
    );
  }

  selectImg(num) {
    this.selectedImgUrl = this.subImgUrl[num];
    this.selectedNum = num;
    this.imgNavigator.nativeElement.querySelectorAll('img').forEach(element => {
      element.classList.remove('show');
    });
    this.imgNavigator.nativeElement.querySelector('#i' + num).classList.add('show');
  }

  addChart() {
    const current = {
      type: 'siteDetail',
      num: '0',
      labels: [
        this.Data['current-duration1'],
        this.Data['current-duration2'],
        this.Data['current-duration3'],
        this.Data['current-duration4'],
        this.Data['current-duration5'],
      ],
      datasets: [{
        data: [
          parseInt(this.Data['current-amount1'], 10) * 10000000,
          parseInt(this.Data['current-amount2'], 10) * 10000000,
          parseInt(this.Data['current-amount3'], 10) * 10000000,
          parseInt(this.Data['current-amount4'], 10) * 10000000,
          parseInt(this.Data['current-amount5'], 10) * 10000000,
        ]
      }]
    };
    const around = {
      type: 'siteDetail',
      num: '1',
      labels: [
        this.Data['around-duration1'],
        this.Data['around-duration2'],
        this.Data['around-duration3'],
        this.Data['around-duration4'],
        this.Data['around-duration5'],
      ],
      datasets: [{
        data: [
          parseInt(this.Data['around-amount1'], 10) * 10000000,
          parseInt(this.Data['around-amount2'], 10) * 10000000,
          parseInt(this.Data['around-amount3'], 10) * 10000000,
          parseInt(this.Data['around-amount4'], 10) * 10000000,
          parseInt(this.Data['around-amount5'], 10) * 10000000,
        ]
      }]
    };
    const container = this.mypostDirective.viewContainerRef;
    container.clear();
    this.postingService.loadComponent(container,
      new PostItem(ChartComponent, current));
    this.postingService.loadComponent(container,
      new PostItem(ChartComponent, around));
  }

  addComment() {
    const body = {
      'c-id': this.Data['c-id'],
      'u-id': this.userInfo['user_id'],
      'date': new Date().toISOString(),
      'contents': this.NewComment.nativeElement.value
    };
    console.log('comment body: ', body);
    if (!body.contents) {
      this.alertService.error('댓글 내용이 없습니다.');
    } else {
      this.contentsService.addComments(body);

      // refresh current page
      let currentUrl;
      if (!this.router.url.split('#')[1]) {
        currentUrl = this.router.url + '#commentBox';
      } else {
        currentUrl = this.router.url;
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigateByUrl(currentUrl));
    }

  }

  getComments() {
    this.contentsService.getComments(this.Data['c-id']).subscribe(
      data => {
        console.log('comments: ', data);
        if (data.content[0]) {
          this.comments = data.content;
          console.log('this.comments: ', this.comments);
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
          new PostItem(SiteCardComponent, records[num]));
      }
    }
  }

  showMore(child) {
    child._elementRef.nativeElement.classList.add('show');
  }

  bookmark() {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error('로그인 하셔야 북마크 하실 수 있습니다.');
    }
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (this.isBookmarked) {
      this.isBookmarked = false;
      bookmark.src = '/assets/img/icon_bookmark_black.png';
      bookmark.classList.remove('selected');
      this.alertService.warn('북마크가 해제되었습니다.');
      this.userService.removeBookmark(this.Data);
    } else {
      this.isBookmarked = true;
      bookmark.src = '/assets/img/icon_bookmark_black_selected.png';
      bookmark.classList.add('selected');
      this.alertService.success('북마크가 설정되었습니다.');
      this.userService.addBookmark(this.Data);
    }
  }

  fbShare() {
    this.fbShareService.share(environment.homeUrl + '/site/' + this.Data['s-type'] + '/' + this.Data['no']);
  }
}

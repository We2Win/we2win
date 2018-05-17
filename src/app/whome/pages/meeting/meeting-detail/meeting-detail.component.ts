import { Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from '../../../services/posting.service';
import { RankingpostDirective } from '../../../directives/rankingpost.directive';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { Meeting } from '../../../models/meeting';
import { environment } from '../../../../../environments/environment';
import { ChartComponent } from '../../../micro/chart/chart.component';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { MeetingCardComponent } from '../../../micro/meeting-card/meeting-card.component';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css'],
  providers: [ContentsService, PostingService]
})
export class MeetingDetailComponent implements OnInit {
  Data = new Meeting();
  id: number;
  imgUrl;
  subImgUrl = ['', '', '', '', ''];
  selectedImgUrl = '';
  selectedNum = 1;
  showMoreReport = false;

  userInfo;
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
    private contentsService: ContentsService,
    private postingService: PostingService,
    private auth: AuthService,
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
    this.contentsService.getSimplesList('meeting', 'date').subscribe(
      data => {
        if (data) {
          this.RankingList = data;
          this.addRankingRecord(this.RankingList);
        }
      }
    );

    this.userInfo = this.auth.getUserInfo();
  }

  updateDetail() {
    this.contentsService.getSimplesDetail('meeting', this.id).subscribe(
      data => {
        if (data) {
          this.Data = data;
          console.log(this.Data);

          this.imgUrl = environment.bucket.downloadUrl + this.Data['master-image'];

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

  addComment() {
    const body = {
      'post-id': this.Data['post-id'],
      'commenter-id': this.userInfo['user_id'],
      'contents': this.NewComment.nativeElement.value
    };
    console.log(body);
    if (!body.contents) {
      alert('댓글 내용이 없습니다.');
    } else {
      this.contentsService.addComments(body);

      // refresh current page
      const currentUrl = this.router.url + '#commentBox';
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigateByUrl(currentUrl));
    }

  }

  getComments() {
    this.contentsService.getComments(this.Data['post-id']).subscribe(
      data => {
        if (data.content[0]) {
          this.comments = data.content;
          // console.log(this.comments);
        }
      }
    );
  }

  formatDate(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 10).replace(/\-/gi, '.');
  }

  addRankingRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpostDirective.viewContainerRef,
          new PostItem(MeetingCardComponent, records[num]));
      }
    }
  }

  showMore(child) {
    child._elementRef.nativeElement.classList.add('show');
  }
}

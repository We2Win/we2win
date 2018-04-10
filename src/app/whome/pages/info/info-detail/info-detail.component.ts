import { Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from '../../../services/posting.service';
import { RankingpostDirective } from '../../../directives/rankingpost.directive';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { Info } from '../../../models/info';
import { environment } from '../../../../../environments/environment';
import { ChartComponent } from '../../../micro/chart/chart.component';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css'],
  providers: [ContentsService, PostingService, AuthService]
})
export class InfoDetailComponent implements OnInit {
  Data = new Info();
  id: number;
  imgUrl;
  subImgUrl = ['', '', '', '', ''];
  selectedImgUrl = '';
  selectedNum = 1;
  showCharts = false;

  userInfo;
  comments = [];

  @ViewChild('NewComment') NewComment;

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
    this.route.params.subscribe(params => {
      this.id = this.route.params['value'].id;
      this.updateDetail();
    });
    this.contentsService.getReportList().subscribe(
      data => {
        if (data.list) {
          this.RankingList = JSON.parse(data.list);
          this.addRankingRecord(this.RankingList);
        }
      }
    );

    this.userInfo = this.auth.getUserInfo();
  }

  updateDetail() {
    this.contentsService.getReportList(this.id).subscribe(
      data => {
        if (data) {
          this.Data = JSON.parse(data.body);
          // console.log(this.Data);
          if (this.Data['I-current-duration1'] || this.Data['I-around-duration1']) {
            this.showCharts = true;
            this.addChart();
          }

          this.imgUrl = environment.bucket.downloadUrl + this.Data['I-image'];
          this.subImgUrl[1] = environment.bucket.downloadUrl + this.Data['I-subImage1'];
          this.subImgUrl[2] = environment.bucket.downloadUrl + this.Data['I-subImage2'];
          this.subImgUrl[3] = environment.bucket.downloadUrl + this.Data['I-subImage3'];
          this.subImgUrl[4] = environment.bucket.downloadUrl + this.Data['I-subImage4'];
          this.subImgUrl[5] = environment.bucket.downloadUrl + this.Data['I-subImage5'];
          this.selectedImgUrl = environment.bucket.downloadUrl + this.Data['I-subImage1'];

          console.log('data: ', this.Data);

          this.meta.addTag({ name: 'og:url', content: 'we2win.com' });
          this.meta.addTag({ name: 'og:title', content: this.Data['I-title'] });
          this.meta.addTag({ name: 'og:description', content: this.Data['I-summary'] });
          this.meta.addTag({ name: 'og:image', content: this.imgUrl });

          this.getComments();
        }
      }
    );
  }

  selectImg(num) {
    this.selectedImgUrl = this.subImgUrl[num];
    this.selectedNum = num;
  }

  addChart() {
    const current = {
      type: 'infoDetail',
      num: '0',
      labels: [
        this.Data['I-current-duration1'],
        this.Data['I-current-duration2'],
        this.Data['I-current-duration3'],
        this.Data['I-current-duration4'],
        this.Data['I-current-duration5'],
      ],
      datasets: [{
        data: [
          parseInt(this.Data['I-current-amount1'], 10),
          parseInt(this.Data['I-current-amount2'], 10),
          parseInt(this.Data['I-current-amount3'], 10),
          parseInt(this.Data['I-current-amount4'], 10),
          parseInt(this.Data['I-current-amount5'], 10),
        ]
      }]
    };
    const around = {
      type: 'infoDetail',
      num: '1',
      labels: [
        this.Data['I-around-duration1'],
        this.Data['I-around-duration2'],
        this.Data['I-around-duration3'],
        this.Data['I-around-duration4'],
        this.Data['I-around-duration5'],
      ],
      datasets: [{
        data: [
          parseInt(this.Data['I-around-amount1'], 10),
          parseInt(this.Data['I-around-amount2'], 10),
          parseInt(this.Data['I-around-amount3'], 10),
          parseInt(this.Data['I-around-amount4'], 10),
          parseInt(this.Data['I-around-amount5'], 10),
        ]
      }]
    };
    this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
      new PostItem(ChartComponent, current));
    this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
      new PostItem(ChartComponent, around));
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

  addRankingRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpostDirective.viewContainerRef,
          new PostItem(InfoCardComponent, records[num]));
      }
    }
  }
}


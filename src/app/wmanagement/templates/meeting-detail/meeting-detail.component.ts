import { Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { Meeting } from '../../models/meeting';
import { Meta } from '@angular/platform-browser';
import { PostingService } from '../../services/posting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MypostDirective } from '../../directives/mypost.directive';
import { PutDataService } from '../put-data.service';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css'],
  providers: [PostingService]
})
export class MeetingDetailComponent implements OnInit {
  Data = new Meeting();
  id: number;
  imgUrl;
  subImgUrl = ['', '', '', '', ''];
  selectedImgUrl = '';
  selectedNum = 1;
  showMoreReport = false;

  // userInfo = new UserInfo;
  userInfo;
  comments = [];

  @ViewChild('NewComment') NewComment;
  @ViewChild('reportDetail') reportDetail;
  @ViewChild('imgNavigator') imgNavigator;

  WeeklyList: any;
  RankingList: any;
  @Input() recentRecords;
  @Input() weeklyRecords;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  // @ViewChild(RankingpostDirective)
  // private rankingpostDirective: RankingpostDirective;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private postingService: PostingService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private putDataService: PutDataService
  ) {
    this.id = this.route.params['value'].id;
    console.log(this.Data);
  }

  ngOnInit() {
    // When routed to another site contents:
    this.putDataService.dataMeeting.subscribe(
      data => {
        this.Data = data;
        this.updateDetail();
      }
    );
    // To get ranking report list.
    // this.contentsService.getSimplesList('meeting', 'date').subscribe(
    //   data => {
    //     if (data) {
    //       this.RankingList = data;
    //       this.addRankingRecord(this.RankingList);
    //     }
    //   }
    // );

  }

  updateDetail() {
    console.log(this.Data);

    this.imgUrl = environment.bucket.downloadUrl + this.Data['master-image'];

    console.log('data: ', this.Data);

    this.meta.addTag({ name: 'og:url', content: 'we2win.com' });
    this.meta.addTag({ name: 'og:title', content: this.Data['title'] });
    this.meta.addTag({ name: 'og:description', content: this.Data['summary'] });
    this.meta.addTag({ name: 'og:image', content: this.imgUrl });

  }

  selectImg(num) {
    this.selectedImgUrl = this.subImgUrl[num];
    this.selectedNum = num;
    this.imgNavigator.nativeElement.querySelectorAll('img').forEach(element => {
      element.classList.remove('show');
    });
    this.imgNavigator.nativeElement.querySelector('#i' + num).classList.add('show');
  }

  formatDate(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 10).replace(/\-/gi, '.');
  }

  // addRankingRecord(records) {
  //   const count = ['first', 'second', 'third'];
  //   for (const num in count) {
  //     if (records[num]) {
  //       records[num]['rank'] = count[num];
  //       // console.log('record: ', records[record]);
  //       this.postingService.loadComponent(this.rankingpostDirective.viewContainerRef,
  //         new PostItem(MeetingCardComponent, records[num]));
  //     }
  //   }
  // }

  showMore(child) {
    child._elementRef.nativeElement.classList.add('show');
  }
}

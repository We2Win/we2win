import { Component, OnInit, ViewChild, ViewContainerRef, Input, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css']
})
export class InfoDetailComponent implements OnInit {
  @Input('Data') Data;
  id: number;
  imgUrl;
  subImgUrl = ['', '', '', '', ''];
  selectedImgUrl = '';
  selectedNum = 1;
  showCharts = true;
  showMoreReport = false;

  @ViewChild('NewComment') NewComment;
  @ViewChild('reportDetail') reportDetail;
  @ViewChild('imgNavigator') imgNavigator;

  WeeklyList: Array<object>;
  RankingList: Array<object>;
  @Input() recentRecords;
  @Input() weeklyRecords;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private _elementRef: ElementRef
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    // When routed to another info contents:
    this.updateDetail();
    // To get ranking report list.
    // this.contentsService.getWeeklyList('report').subscribe(
    //   data => {
    //     if (data) {
    //       this.RankingList = data;
    //       this.addRankingRecord(this.RankingList);
    //     }
    //   }
    // );

  }

  updateDetail() {
    console.log('this.Data: ', this.Data);
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

  addChart() {
    // console.log('data: ', this.Data);
    const current = {
      type: 'infoDetail',
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
          parseInt(this.Data['current-amount1'], 10) * 1000000,
          parseInt(this.Data['current-amount2'], 10) * 1000000,
          parseInt(this.Data['current-amount3'], 10) * 1000000,
          parseInt(this.Data['current-amount4'], 10) * 1000000,
          parseInt(this.Data['current-amount5'], 10) * 1000000,
        ]
      }],
      options: {

      }
    };
    const around = {
      type: 'infoDetail',
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
          parseInt(this.Data['around-amount1'], 10) * 1000000,
          parseInt(this.Data['around-amount2'], 10) * 1000000,
          parseInt(this.Data['around-amount3'], 10) * 1000000,
          parseInt(this.Data['around-amount4'], 10) * 1000000,
          parseInt(this.Data['around-amount5'], 10) * 1000000,
        ]
      }]
    };
    // const container = this.mypostDirective.viewContainerRef;
    // container.clear();
    // this.postingService.loadComponent(container,
    //   new PostItem(ChartComponent, current));
    // this.postingService.loadComponent(container,
    //   new PostItem(ChartComponent, around));
  }

}

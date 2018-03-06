import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PageInfoService } from '../../page-info.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.css'],
  providers: [PageInfoService]
})
export class TitleBannerComponent implements OnInit {
  // @Input() type;
  dataset: Object = {
    'title': '',
    'description': '',
    'type': '',
  };
  route: Object = {
    '부동산 정보': 'info',
    '리포트': 'info',
    '부동산 뉴스': 'news',
    '법률 및 정책': 'law',
    '주간 순위': 'weekly',
    '분양 현장': 'site',
    '아파트': 'apartment',
    '오피스텔': 'officetel',
    '상가/호텔': 'commercial',
    '토지': 'ground',
    '구인 정보': 'employee',
    '구직 정보': 'employer',
    '오프라인 모임': 'meeting'
  };

  constructor(
    private pageInfoService: PageInfoService,
    router: Router,
    location: Location,
    private _elementRef: ElementRef
  ) {
    router.events.subscribe(event => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        const routePath = event.urlAfterRedirects;
        this.updateData(routePath);
        this._elementRef.nativeElement.className = this.route[this.dataset['title']];
        console.log(this.route[this.dataset['title']]);
      }
    });
  }
  ngOnInit() {
  }

  updateData(routePath) {
    this.dataset['title'] = this.pageInfoService.getCurrentData(routePath, 'title') || '';
    this.dataset['description'] = this.pageInfoService.getCurrentData(routePath, 'description') || '';
  }

}

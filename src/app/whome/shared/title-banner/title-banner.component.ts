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
    '분양 현장': 'site',
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
      }
    });
  }
  ngOnInit() {
  }

  updateData(routePath) {
    this.dataset['title'] = this.pageInfoService.getCurrentData(routePath, 'title') || '';
    this.dataset['description'] = this.pageInfoService.getCurrentData(routePath, 'description') || '';
    this._elementRef.nativeElement.querySelector('section').className = this.route[this.dataset['title']];
  }

}

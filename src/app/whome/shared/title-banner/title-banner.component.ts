import { Component, OnInit } from '@angular/core';
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
  dataset: Object = {
    'title': '',
    'description': ''
  };

  constructor(private pageInfoService: PageInfoService, router: Router, location: Location) {
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
  }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PageInfoService } from '../../page-info.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PageInfoService]
})
export class HeaderComponent implements OnInit {
  dataset: Object = {
    'title': '',
    'description': ''
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
  }

  viewPopup() {
    this._elementRef.nativeElement.querySelector('app-popup').classList.add('show');
  }
}

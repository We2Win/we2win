import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Info } from '../../models/info';
import { Card } from '../../models/card';
import { FbShareService } from '../../services/fb-share.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-law-card',
  templateUrl: './law-card.component.html',
  styleUrls: ['./law-card.component.css']
})
export class LawCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl = '/assets/img/icon_document.png';

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    console.log(this.record);
    switch (this.record['L-file'].split('.')[1]) {
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'gif':
        this.imageUrl = environment.bucket.downloadUrl + this.record['L-file'];
      break;
    }
    this._elementRef.nativeElement.classList.add(this.record['L-level'].toLowerCase());
  }

  bookmark() {
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (bookmark.classList.contains('selected')) {
      bookmark.src = '/assets/img/icon_bookmark.png';
      bookmark.classList.remove('selected');
    } else {
      bookmark.src = '/assets/img/icon_bookmark_selected.png';
      bookmark.classList.add('selected');
    }
  }

  fbShare() {
    this.fbShareService.share(environment.homeUrl + '/info/report' + this.record['L-id']);
  }

  download() {
    if (this.auth.isAuthenticated()) {
      window.location.assign(environment.bucket.downloadUrl + this.record['L-file']);
    } else {
      alert('로그인이 필요합니다.');
    }
  }
}

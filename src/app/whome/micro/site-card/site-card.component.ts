/**
 * @file law-card.component.ts
 * @author
 * @brief a micro component for showing a content of site(apartment, officetel, commercial, and ground) contents.
 */
import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FbShareService } from '../../services/fb-share.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.css']
})
export class SiteCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'STANDARD';
  isBookmarked = false;
  // '분양중', '분양 마감', '미정';
  dateStatus = '미정';

  engType = {
    '리포트': 'report',
    '부동산 뉴스': 'news',
    '법률 및 정책': 'law',
    '아파트': 'apartment',
    '오피스텔': 'officetel',
    '상가/호텔': 'commercial',
    '토지': 'ground'
  };

  imageUrl;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService,
    private alertService: AlertService,
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    // console.log(this.record);
    this.imageUrl = environment.bucket.downloadUrl + this.record['master-image'];
    if (this.record['level']) {
      this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
    }
    const now = new Date();
    const start = new Date(this.record['open-start']);
    const end = new Date(this.record['open-end']);
    if (now > start && now < end) {
      this.dateStatus = '분양중';
    } else {
      this.dateStatus = '분양 마감';
    }
    this.isBookmarked = this.record['isBookmarked'];
  }

  formatDate(dateStr) {
    return dateStr.slice(0, 10).replace(/\-/gi, '.');
  }

  isSelf() {
    const paths = window.location.pathname.split('/');
    // console.log('paths: ', paths, paths[1] === 'site', paths[3] === this.record['no']);
    // tslint:disable-next-line:triple-equals
    if (paths[1] === 'site' && paths[3] == this.record['no']) {
      this.alertService.info('현재 컨텐츠와 동일한 컨텐츠입니다.');
    }
  }

  bookmark() {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error('로그인 하셔야 북마크 하실 수 있습니다.');
    }
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (this.isBookmarked) {
      this.isBookmarked = false;
      this.alertService.warn('북마크가 해제되었습니다.');
      this.userService.removeBookmark(this.record);
    } else {
      this.isBookmarked = true;
      this.alertService.success('북마크가 설정되었습니다.');
      this.userService.addBookmark(this.record);
    }
  }

  fbShare() {
    this.fbShareService.share(environment.homeUrl + '/site/' + this.record['s-type'] + '/' + this.record['no'], this.record['c-id']);
  }
}

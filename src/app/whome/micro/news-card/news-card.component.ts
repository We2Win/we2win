import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FbShareService } from '../../services/fb-share.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'STANDARD';
  isBookmarked = false;

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
    this.isBookmarked = this.record['isBookmarked'];
  }

  isSelf() {
    if (window.location.pathname === '/info/news/' + this.record['no']) {
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
    this.fbShareService.share(environment.homeUrl + '/info/news' + this.record['no'], this.record['c-id']);
  }
}

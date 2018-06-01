import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Card } from '../../models/card';
import { FbShareService } from '../../services/fb-share.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ContentsService } from '../../services/contents.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-law-card',
  templateUrl: './law-card.component.html',
  styleUrls: ['./law-card.component.css'],
  providers: [ ContentsService ]
})
export class LawCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl = '/assets/img/icon_document.png';

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService,
    private alertService: AlertService,
    private userService: UserService,
    private authService: AuthService,
    private contentsService: ContentsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // console.log(this.record);
    if (this.record['file']) {
      switch (this.record['file'].split('.')[1]) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
          this.imageUrl = environment.bucket.downloadUrl + this.record['file'];
          break;
      }
    }
    if (this.record['level']) {
      this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
    }
  }

  bookmark() {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error('로그인 하셔야 북마크 하실 수 있습니다.');
    }
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (bookmark.classList.contains('selected')) {
      bookmark.src = '/assets/img/icon_bookmark.png';
      bookmark.classList.remove('selected');
      this.alertService.warn('북마크가 해제되었습니다.');
      this.userService.removeBookmark(this.record);
    } else {
      bookmark.src = '/assets/img/icon_bookmark_selected.png';
      bookmark.classList.add('selected');
      this.alertService.success('북마크가 설정되었습니다.');
      this.userService.addBookmark(this.record);
    }
  }

  fbShare() {
    this.alertService.warn('법률 및 정책 파일은 공유할 수 없습니다.');
  }

  download() {
    if (this.authService.isAuthenticated()) {
      this.contentsService.getFilePath(this.record['c-id']).subscribe(
        data => {
          console.log('file data:', data['content']['file']);
          window.location.assign(environment.bucket.downloadUrl + data['content']['file']);
        });
    } else {
      this.router.navigate(['login']);
    }
  }
}

import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Card } from '../../models/card';
import { environment } from '../../../../environments/environment';
import { FbShareService } from '../../services/fb-share.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
  providers: [FbShareService]
})
export class InfoCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService,
    private alertService: AlertService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // console.log('record: ', this.record);
    this.imageUrl = environment.bucket.downloadUrl + this.record['master-image'];
    this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
  }

  bookmark() {
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (bookmark.classList.contains('selected')) {
      bookmark.src = '/assets/img/icon_bookmark.png';
      bookmark.classList.remove('selected');
      this.alertService.warn('북마크가 해제되었습니다.');
    } else {
      bookmark.src = '/assets/img/icon_bookmark_selected.png';
      bookmark.classList.add('selected');
      this.alertService.success('북마크가 설정되었습니다.');
      this.userService.addBookmark('info', this.record['no']);
    }
  }

  fbShare() {
    this.fbShareService.share(environment.homeUrl + '/info/report' + this.record['no']);
  }

}

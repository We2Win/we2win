import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Card } from '../../models/card';
import { environment } from '../../../../environments/environment';
import { FbShareService } from '../../services/fb-share.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css'],
  providers: [FbShareService]
})
export class MeetingCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.imageUrl = environment.bucket.downloadUrl + this.record['master-image'];
    this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
  }

  formatDate(dateStr) {
    return dateStr.slice(0, 10).replace(/\-/gi, '.');
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
    this.fbShareService.share(environment.homeUrl + '/info/report');
  }

}

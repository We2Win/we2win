import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FbShareService } from '../../services/fb-share.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService
  ) {
  }

  ngOnInit() {
    // console.log(this.record);
    this.imageUrl = environment.bucket.downloadUrl + this.record['master-image'];
    this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
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
    this.fbShareService.share(environment.homeUrl + '/info/news' + this.record['no']);
  }
}

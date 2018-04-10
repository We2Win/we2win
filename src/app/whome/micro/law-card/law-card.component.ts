import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Info } from '../../models/info';
import { Card } from '../../models/card';
import { FbShareService } from '../../services/fb-share.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-law-card',
  templateUrl: './law-card.component.html',
  styleUrls: ['./law-card.component.css']
})
export class LawCardComponent implements OnInit, Card {
  // for Card interface
  @Input() data: any;
  // data;

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
    console.log(this.record);
    this.imageUrl = environment.bucket.downloadUrl + this.record['I-image'];
    this._elementRef.nativeElement.classList.add(this.record['I-level'].toLowerCase());
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
    this.fbShareService.share(environment.homeUrl + '/info/report' + this.record['I-id']);
  }

}

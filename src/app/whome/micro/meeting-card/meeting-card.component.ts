import { Component, OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { FbShareService } from '../../services/fb-share.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css'],
  providers: [FbShareService]
})
export class MeetingCardComponent implements OnInit {

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService
  ) { }

  ngOnInit() {
    this._elementRef.nativeElement.classList.add('platinum');
 
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

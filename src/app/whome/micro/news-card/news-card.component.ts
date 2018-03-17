import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl;
  // for Card interface
  // @Input() data: any;
  // data;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    console.log(this.record);
    this.imageUrl = environment.bucket.downloadUrl + this.record['N-image'];
    console.log(this.imageUrl);
    // if (this.data) {
    //   this.record.Title = this.data.Title;
    //   this.record.Description = this.data.Description;
    // }

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
}

import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() record = {
    Title: 'No name',
    Description: 'nothing.'
  };
  @Input() level = 'standard';

  // for Card interface
  @Input() data: any;
  // data;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.record.Title = this.data.Title;
      this.record.Description = this.data.Description;
    }
    // console.log('records from vertical to info-card: ', this.records);

    // setTimeout(() => {
    //   this.record.Title = this.data.Title;
    // }, 3000);

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

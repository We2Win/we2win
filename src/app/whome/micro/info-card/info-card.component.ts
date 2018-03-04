import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Info } from '../../models/info';
import { Card } from '../../models/card';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit, Card {
  @Input() record: Info = {
    Title: 'No name',
    Description: 'nothing.'
  };
  @Input() level: string;

  // for Card interface
  @Input() data: any;
  // data;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.record.Title = 'Testing';
    this.record.Description = 'This is testing description';
    // console.log('records from vertical to info-card: ', this.records);
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

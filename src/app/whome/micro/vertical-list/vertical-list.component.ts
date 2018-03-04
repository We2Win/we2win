import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit, OnChanges {
  _toptitle: String;

  @Input() toptitle = '무제';
  @Input() records;

  constructor( _elementRef: ElementRef) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('records at vertical-list: ', this.records);
  }

}

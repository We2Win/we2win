import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit {
  _toptitle: String;

  @Input() toptitle = '무제';
  @Input() records;

  constructor( _elementRef: ElementRef) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {
    setInterval(() => { console.log('records form parent to vertical-list: ', this.records); }, 1000);
  }

}

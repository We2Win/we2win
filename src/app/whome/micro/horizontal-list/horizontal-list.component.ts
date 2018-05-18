import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from 'events';

@Component({
  selector: 'app-horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.css']
})
export class HorizontalListComponent implements OnInit {
  _toptitle: String;
  @Input('hasMoreContents') hasMoreContents = true;

  // @Input() toptitle = 'hi';

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  sorter: EventEmitter<string> = new EventEmitter<string>();

  count = 1;

  constructor(
  ) {
    // this._toptitle = this.toptitle;
  }

  ngOnInit() {
  }

  showMore() {
    this.count = this.count  + 1;
    this.change.emit(this.count);
  }

  sort(event) {
    this.sorter.emit(event);
  }

}

/**
 * @file horizontal-list.component.ts
 * @author
 * @brief a micro component for showing contents horizontally.
 * @see this can contain various types of card contents.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.css']
})
export class HorizontalListComponent implements OnInit {
  _toptitle: String;
  @Input('hasMoreContents') hasMoreContents = true;
  @Input('isNoNeed') isNoNeed = false;
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

  resetPage() {
    this.count = 1;
  }

}

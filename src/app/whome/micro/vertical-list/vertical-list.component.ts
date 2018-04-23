import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit, OnChanges {
  _toptitle: String;

  @Input() toptitle = '무제';
  @Input() maxCount;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  count = 0;

  constructor(
  ) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {
  }

  increment() {
    this.count = (this.count + 1) % this.maxCount;
    this.change.emit(this.count);
  }

  decrement() {
    this.count = (this.count + this.maxCount - 1) % this.maxCount;
    this.change.emit(this.count);
  }

  ngOnChanges() {
  }

}

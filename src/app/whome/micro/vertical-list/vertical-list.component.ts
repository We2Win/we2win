import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit, OnChanges {
  _toptitle: String;
  isBunyang = false;

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
    if (this.toptitle === '분양 리포트') {
      this.isBunyang = true;
    }
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

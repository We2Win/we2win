import { Component, ViewChild, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit, OnChanges {
  _toptitle: String;
  isBunyang = false;

  @Input() toptitle = '무제';
  @ViewChild('contents') contents;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  sorter: EventEmitter<string> = new EventEmitter<string>();

  count = 1;

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
    // console.log('count in vertical-list: ', this.count);
    this.count = (this.count + 1);
    this.change.emit(this.count);
    // console.log(this.contents.nativeElement.innerHTML);
    // this.contents.nativeElement.innerHTML = '';
  }

  decrement() {
    this.count = (this.count - 1);
    this.change.emit(this.count);
  }

  sort(event) {
    this.sorter.emit(event);
  }

  ngOnChanges() {
  }

}

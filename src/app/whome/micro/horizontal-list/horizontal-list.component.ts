import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.css']
})
export class HorizontalListComponent implements OnInit {
  _toptitle: String;
  hiddenNum;

  @Input() toptitle = 'hi';
  @Input('records') records;

  constructor(
    private _elementRef: ElementRef
  ) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {
    console.log(this.records);
  }

  showMore() {
    this._elementRef.nativeElement.querySelector('.c2').classList.add('show');
  }

}

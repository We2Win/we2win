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

  constructor(
    private _elementRef: ElementRef
  ) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {
  }

  showMore() {
    this._elementRef.nativeElement.querySelector('.c2').classList.add('show');
  }

}

import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.css']
})
export class HorizontalListComponent implements OnInit {
  _toptitle: String;

  @Input() toptitle = 'hi';

  constructor(el: ElementRef) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {

  }

}

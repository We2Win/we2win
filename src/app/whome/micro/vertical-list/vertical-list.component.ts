import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit {
  _toptitle: String;

  @Input() toptitle = 'hi';

  constructor(el: ElementRef) {
    this._toptitle = this.toptitle;
  }

  ngOnInit() {

  }

}

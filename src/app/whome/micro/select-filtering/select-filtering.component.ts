/**
 * @file button.component.ts
 * @author
 * @brief a micro component of a customized selectbox only for filtering contents.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select-filtering',
  templateUrl: './select-filtering.component.html',
  styleUrls: ['./select-filtering.component.css']
})
export class SelectFilteringComponent implements OnInit {
  type: Array<string> = ['최근순', '클릭수', '댓글수', '공유횟수', '스크랩'];
  selected: string = this.type[0];
  divHover: Boolean = false;
  ulHover: Boolean = false;

  @Output()
  sorter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  viewUl(isDiv) {
    this._elementRef.nativeElement.querySelector('ul').classList.add('show');
  }

  semiViewUl(isDiv) {
    this._elementRef.nativeElement.querySelector('ul').classList.add('semiShow');
  }

  hideUl(isDiv) {
    this._elementRef.nativeElement.querySelector('ul').classList.remove('show');
    this._elementRef.nativeElement.querySelector('ul').classList.remove('semiShow');
  }

  selectValue(ev) {
    if (ev.target.nodeName === 'LI') {
      this.selected = ev.target.innerText;
      this.sorter.emit(this.selected);
    }
    this.hideUl(false);
  }
}

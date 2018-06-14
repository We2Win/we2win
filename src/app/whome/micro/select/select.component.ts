/**
 * @file select.component.ts
 * @author
 * @brief a micro component of a customized selectbox.
 */
import { Component, OnInit, Input, Output } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() type: string;
  @Output() change = new EventEmitter();
  selected: string;

  constructor(private _elementRef: ElementRef) { }

  categories: Object = {
    '가용자산': ['2000만원', '5000만원', '1억', '3억', '5억 이상'],
    '관심지역': ['수도권', '대전광역시', '대구광역시', '부산광역시', '광주광역시', '강원도', '충청도', '전라도', '경상도'],
    '관심금액': ['ALL', '5,000만원 미만', '1억 미만', '3억 미만', '5억 미만', '5억 이상'],
  };

  ngOnInit() {
    this.selected = this.type;
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
    // console.log(ev);
    if (ev.target.nodeName === 'LI') {
      this.selected = ev.target.innerHTML;
      this.change.emit(this.selected);
      if (this.selected === '하위 카테고리') {
        // console.log(this.topCategory);
      }
    } else if (ev.path[1].nodeName === 'LI') {
      this.selected = ev.path[1].innerHTML;
      this.change.emit(this.selected);
    } else {
      console.log('error: ', ev.path);
    }
    this.hideUl(false);
  }
}

/**
 * @file select.component.ts
 * @author
 * @brief a micro component of a customized selectbox.
 */
import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() isSub: boolean;
  @Input() topCategory: string;
  @Input() contentNoArr;
  @Output() change = new EventEmitter();
  @Output() contentsChange = new EventEmitter();

  selected: string;
  @Input()
  set _selected(value: string) {
    this.selected = value;
  }

  categories: Object = {
    '회원 등급': ['ALL', 'STANDARD', 'PREMIUM', 'PLATINUM', 'MANAGER', 'ADMIN'],
    '컨텐츠 등급': ['ALL', 'STANDARD', 'PREMIUM', 'PLATINUM'],
    '금액': ['ALL', '5,000만원 미만', '1억 미만', '3억 미만', '5억 미만', '5억 이상'],
    '카테고리': ['부동산 뉴스', '리포트', '법과 정책'],
    '상위 카테고리': ['부동산 정보', '분양 현장', '오프라인 모임'],
    '하위 카테고리': [],
    '컨텐츠 제목': []
  };
  subcategories: Object = {
    '부동산 정보': ['리포트', '부동산 뉴스', '법률 및 정책'],
    '분양 현장': ['아파트', '오피스텔', '상가/호텔', '토지'],
    '오프라인 모임': ['오프라인 모임'],
    '구인 구직': ['구인', '구직']
  };

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.selected = this.type;

    // set initial value
    if (this.selected === '상위 카테고리') {
      this.selected = '부동산 정보';
    } else if (this.selected === '하위 카테고리') {
      this.selected = '리포트';
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // console.log(changes);
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
    console.log(ev);
    if (ev.target.nodeName === 'LI') {
      this.selected = ev.target.innerHTML;
      this.change.emit(this.selected);
      console.log(this.getIndexInParent(ev.target));
      // console.log(this.categories['컨텐츠 제목'].indexOf(this.selected), this.selected, this.contentNoArr);
      this.contentsChange.emit(this.getIndexInParent(ev.target));
      if (this.selected === '하위 카테고리') {
        // console.log(this.topCategory);
      }
    } else if (ev.path[1].nodeName === 'LI') {
      this.selected = ev.path[1].innerHTML;
      this.change.emit(this.selected);
    } else {
      console.log('error: ');
    }
    this.hideUl(false);
  }

  getIndexInParent(node) {
    const children = node.parentNode.children;    // Note: Not `childNodes`
    for (let i = 0; i < children.length; i++) { // Note: 0 <= n < length
      if (children[i] === node) { return i; }    // Note: No other criteria, and +1 on value
    }
    return -1;
  }

}

import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() topCategory: string;
  selected: String;

  categories: Object = {
    '회원 등급': ['ALL', 'STANDARD', 'PREMIUM', 'PLATINUM'],
    '금액': ['ALL', '5,000만원 미만', '1억 미만', '3억 미만', '5억 미만', '5억 이상'],
    '카테고리': ['부동산 뉴스', '리포트', '법과 정책'],
    '상위 카테고리': ['부동산 정보', '분양 현황', '오프라인 모임', '구인 구직'],
    '하위 카테고리': ['상위 카테고리를 선택하세요'],
    '컨텐츠 제목': ['이 주의 분양 핫이슈는?', '53차 경남 분양 오피스텔에 대해서 알아보자']
  };
  subcategories: Object = {
    '부동산 정보': ['리포트', '부동산 정보', '법률 및 정책'],
    '분양 현황': ['아파트', '오피스텔', '상가', '호텔', '토지'],
    '구인 구직': ['구인', '구직', '등록요청']
  };

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.selected = this.type;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
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
    if (ev.path[0].nodeName === 'LI') {
      this.selected = ev.path[0].innerText;

      console.log(this.selected);

      if (this.selected === '하위 카테고리') {
        console.log(this.topCategory);
      }
    }
    this.hideUl(false);
  }
}

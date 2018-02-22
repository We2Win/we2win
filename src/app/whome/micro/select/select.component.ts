import { Component, OnInit } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  type: Array<String> = ['클릭수', '댓글수', '공유횟수', '스크랩'];
  selected: String = this.type[0];
  divHover: Boolean = false;
  ulHover: Boolean = false;

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
    if (ev.path[0].nodeName === 'LI') {
      this.selected = ev.path[0].innerText;
    }
    this.hideUl(false);
  }
}

import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[level]'
})
export class LevelDirective implements OnInit {
  @Input() level: string;
  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
    this._elementRef.nativeElement.classList.add(this.level);
  }

}

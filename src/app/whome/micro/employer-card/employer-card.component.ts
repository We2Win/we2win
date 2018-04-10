import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-employer-card',
  templateUrl: './employer-card.component.html',
  styleUrls: ['./employer-card.component.css']
})
export class EmployerCardComponent implements OnInit {
  @Input('record') record;

  constructor(
    private _elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
  }

  viewPopup() {
    this._elementRef.nativeElement.querySelector('app-popup').classList.add('show');
  }

}

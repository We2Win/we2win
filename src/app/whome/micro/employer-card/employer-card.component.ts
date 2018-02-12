import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-employer-card',
  templateUrl: './employer-card.component.html',
  styleUrls: ['./employer-card.component.css']
})
export class EmployerCardComponent implements OnInit {

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  viewPopup() {
    this._elementRef.nativeElement.querySelector('app-popup').classList.add('show');
  }

}

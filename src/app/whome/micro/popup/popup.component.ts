import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  showPopup() {
    this._elementRef.nativeElement.classList.add('show');
  }

  hidePopup() {
    this._elementRef.nativeElement.classList.remove('show');
  }
}

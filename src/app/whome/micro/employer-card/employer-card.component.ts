/**
 * @file employer-card-component.ts
 * @author
 * @brief a micro component for showing a content of job information.
 */
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-employer-card',
  templateUrl: './employer-card.component.html',
  styleUrls: ['./employer-card.component.css']
})
export class EmployerCardComponent implements OnInit {
  @Input('record') record;

  constructor(
    private _elementRef: ElementRef,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
  }

  viewPopup() {
    const now = new Date();
    const applyEndDate = new Date(this.record['apply-end']);

    if (now > applyEndDate) {
      this.alertService.warn('유효기간이 지난 항목입니다.');
      return false;
    }

    this._elementRef.nativeElement.querySelector('app-popup').classList.add('show');
  }
}

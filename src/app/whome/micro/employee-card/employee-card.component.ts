/**
 * @file employee-card.component.ts
 * @author
 * @description a micro component for showing a conent of job seekers.
 */
import { Component, OnInit, Input, ViewContainerRef, ElementRef } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  @Input('record') record;

  imageUrl;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.imageUrl = environment.bucket.downloadUrl + this.record['master-image'];
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

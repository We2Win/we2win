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
    this._elementRef.nativeElement.querySelector('app-popup').classList.add('show');
  }
}

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
  @Input() level = 'standard';

  imageUrl;

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.imageUrl = environment.bucket.downloadUrl + this.record['master-image'];
    this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
  }

}

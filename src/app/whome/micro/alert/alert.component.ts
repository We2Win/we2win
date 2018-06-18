/**
 * @file alert.component.ts
 * @author
 * @brief a micro component for a space to alert something.
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertService } from '../../services/alert.service';
import { Alert, AlertType } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];
  black = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // console.log('alert component started.');
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        this.black = false;
        return;
      }

      this.black = true;
      setTimeout(() => {
        this.black = false;
      }, 3000);

      // add alert to array
      this.alerts.push(alert);
      // console.log('alerts: ', alert, this.alerts);

    }, err => { console.log(err); } );
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}

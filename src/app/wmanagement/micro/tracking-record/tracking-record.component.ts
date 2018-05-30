import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-tracking-record',
  templateUrl: './tracking-record.component.html',
  styleUrls: ['./tracking-record.component.css']
})
export class TrackingRecordComponent implements OnInit {
  @Input('record') record;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('record in trackingRecordComponent: ', this.record);
  }
}

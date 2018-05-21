import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInfo } from '../../../../wmanagement/models/userInfo';
import { AlertService } from '../../../services/alert.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  userInfo;
  detailedInfo;

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    console.log('userInfo: ', this.userInfo);
    this.authService.getUserInfoDetail(userInfo).subscribe(
      (res: any) => { this.detailedInfo = res; },
      (err) => { this.alertService.error(err); }
    );
    // this.userInfo = JSON.parse(this.authService.getUserInfo());
  }

}

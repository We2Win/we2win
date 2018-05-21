import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInfo } from '../../../../wmanagement/models/userInfo';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  userInfo: UserInfo = new UserInfo();
  detailedInfo;

  hopeList = ['투자', '실거주', '모두 해당'];

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    console.log(this.authService.getUserInfo());
    this.userInfo = JSON.parse(this.authService.getUserInfo());
    console.log('userInfo: ', this.userInfo);
    this.authService.getUserInfoDetail(this.userInfo).subscribe(
      (res: any) => { this.detailedInfo = res; },
      (err) => { this.alertService.error(err); }
    );
    // this.userInfo = JSON.parse(this.authService.getUserInfo());
  }

}

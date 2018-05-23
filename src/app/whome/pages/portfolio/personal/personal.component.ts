import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { UserInfo, DetailedInfo } from '../../../models/userInfo';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  userInfo = new UserInfo();
  detailedInfo = new DetailedInfo();

  hopeList = ['투자', '실거주', '모두 해당'];

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    this.authService.getUserInfoDetail(this.userInfo).subscribe(
      (res: any) => {
        this.detailedInfo = res.user;
        console.log(this.detailedInfo);
      },
      (err) => { this.alertService.error(err); }
    );
  }

}

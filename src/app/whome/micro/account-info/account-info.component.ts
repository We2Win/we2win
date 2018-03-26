import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DbConnectService } from '../../../db-connect.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  providers: [
    DbConnectService,
  ]
})
export class AccountInfoComponent implements OnInit {
  isLogin = false;
  showProfile = false;
  showMail = false;
  showNotification = false;

  user = {
    id: '-',
    name: '이름없음',
    point: '-',
    start: '',
    end: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
      const userInfo: any = this.authService.getUserInfo();
      this.user.id = userInfo.user_id;
      this.user.point = userInfo.user_point;
      this.user.name = userInfo.user_name;
      this.user.start = userInfo.user_start;
      this.user.end = userInfo.user_end;
    }
  }

  logout() {
    if (this.authService.logout()) {
      this.isLogin = false;
      this.showProfile = false;
    }
  }

  editProfile() {
    this.router.navigate(['/portfolio']);
    this.showProfile = false;
  }

}

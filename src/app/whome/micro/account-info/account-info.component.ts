import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DbConnectService } from '../../../db-connect.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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
    end: '',
    level: '',
  };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
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
      this.user.level = userInfo.user_level;
      console.log(this.user);
    }

    setTimeout(() => {
      this.checkStatus();
    }, 900000);
  }

  checkStatus() {
    if (!this.authService.isAuthenticated()) {
      this.info('시간이 만료되어 자동 로그아웃 되었습니다.');
      this.isLogin = false;
      this.showProfile = false;
    }
  }

  checkAdmin() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['mng']);
    } else {
      this.error('관리자만 접속 가능합니다.');
    }
  }

  logout() {
    if (this.authService.logout()) {
      this.isLogin = false;
      this.showProfile = false;
    }
  }

  editProfile() {
    this.router.navigate(['/portfolio/personal']);
    this.showProfile = false;
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DbConnectService } from '../../../db-connect.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

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
  private user = {
    id: 'noname',
    point: '-'
  };

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
      this.user.id = this.authService.getUserId();
    }
  }

  logout() {
    this.authService.logout();
    this.isLogin = false;
  }

}

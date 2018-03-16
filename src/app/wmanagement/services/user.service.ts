import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

  getUserList() {
    return this.http.get(environment.apiUrl + '/mng/users')
      .map((res: any) => res);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getUserInfo(): string {
    // console.log(this.getToken());
    return this.jwtHelper.decodeToken(this.getToken());
  }
}

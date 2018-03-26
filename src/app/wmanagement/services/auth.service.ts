import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getUserInfo(): any {
    // console.log(this.getToken());
    return this.jwtHelper.decodeToken(this.getToken());
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

}

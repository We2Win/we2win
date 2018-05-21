import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { catchError, retry } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { Token } from '../models/token';
import { environment } from '../../../environments/environment';
import { AlertService } from './alert.service';
import { UserInfo } from '../models/userInfo';


@Injectable()
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper,
    private alertService: AlertService
  ) {

  }

  auth: boolean;
  checkAuth() {
    // checkAuth(): Observable<boolean> {
    return this.http.get(this.appUrl + '/users')
      .map(res => {
        console.log(res);
        if (res['auth'] === 1) {
          return true;
        } else {
          return false;
        }
      });
  }

  login(user: UserInfo) {
    const bodyString = JSON.stringify(user);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post(environment.apiUrl + '/login', bodyString, headers)
      .do((res: any) => this.setToken(res.token),
      (err) => { this.alertService.error(err); }
    )
      .shareReplay();
  }

  loginWithNaver() {

    // Kakao.init('b560ff0ff0ea7935612a6555fb53c516');

    return this.http.get(environment.naver.reqUrl)
      .map(res => {
        console.log(res);
      });
  }

  // signin(credential: User) {
  signin(credential: UserInfo): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/auth/signin`, credential)
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  logout(): boolean {
    if (confirm('로그아웃 하시겠습니까?')) {
      this.removeToken();
      return true;
    }
    return false;
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  isAdministrator(): boolean {
    const info = this.jwtHelper.decodeToken(this.getToken());

    if (info['user_level'] === 'ADMIN') {
      return true;
    }

    return false;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getUserInfo(): string {
    // console.log(this.getToken());
    return this.jwtHelper.decodeToken(this.getToken());
  }

  getUserInfoDetail(info) {
    const headers = { headers: { 'Content-Type': 'application/json' } };
    console.log('executing getUserInfoDetail(): ', environment.apiUrl + '/userInfo');
    return this.http.post(environment.apiUrl + '/userInfo', info, headers)
      .do((res: any) => console.log('res: ', res),
      (err) => { this.alertService.error(err); }
      )
      .shareReplay();
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  /*
    token 유효 기간 체크
    The JwtHelper class has several useful methods that can be utilized in your components:

    decodeToken
    getTokenExpirationDate
    isTokenExpired

    npm install angular2-jwt
    https://github.com/auth0/angular2-jwt
  */
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }
}

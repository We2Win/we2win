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

import { User } from '../models/user';
import { Token } from '../models/token';

import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

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

  login(user: User) {
    const bodyString = JSON.stringify(user);
    const headers = { headers: { 'Content-Type': 'application/json' }};

    return this.http.post(environment.apiUrl + '/login', bodyString, headers)
      .do((res: any) => this.setToken(res.token))
      .shareReplay();
  }

  // signin(credential: User) {
  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/auth/signin`, credential)
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  logout(): void {
    if (confirm('로그아웃 하시겠습니까?')) {
      this.removeToken();
    }
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getUserId(): string {
    console.log(this.getToken());
    return this.jwtHelper.decodeToken(this.getToken()).user_id;
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

  getUserid(): string {
    return this.jwtHelper.decodeToken(this.getToken()).userid;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
  TOKEN_NAME;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

  auth: boolean;
  checkAuth(): Observable<boolean> {
    return this.http.get(this.appUrl)
      .map(response => {
        console.log(response);
        if (response['auth'] === 1) {
          return true;
        } else {
          return false;
        }
      });
  }
  login(user: User) {
    const bodyString = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    alert(environment.apiUrl + '/login');

    return this.http.post(environment.apiUrl + '/login', bodyString);
      // .map(response => {
      //   console.log(response);
      //   if (response['auth'] === 1) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }).catch(() => {
      //   console.log('Could not login');
      //   return Observable.of(false);
      // });
  }

  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/auth/signin`, credential)
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  signout(): void {
    this.removeToken();
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
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

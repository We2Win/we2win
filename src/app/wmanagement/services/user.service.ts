import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../models/userInfo';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  appUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper,
    private authService: AuthService
  ) { }

  getUserList(level, amount, id?: any) {
    return this.http.get(environment.apiUrl + '/mng/users/' + level + '/' + amount + '/' + (id || '1'))
      .map((res: any) => res);
  }

  searchUser(query) {
    return this.http.get(environment.apiUrl + '/mng/users/' + query)
      .map((res: any) => res);
  }

  deleteUser(user: UserInfo): Observable<UserInfo> {
    const url = environment.apiUrl + '/mng/users/' + user['u-id'];
    const bodyString = JSON.stringify(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

  return this.http.delete<UserInfo>(url, httpOptions)
    .map((res: UserInfo) => res);
      // .catch((error: any) => { console.log(error.message); });
  }

  setLevel(_body, level) {
    const body = {
      level: level,
      array: _body
    };
    return this.http.post(environment.apiUrl + '/mng/level', body);
  }
}

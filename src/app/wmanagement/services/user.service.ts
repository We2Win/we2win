import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../models/userInfo';

@Injectable()
export class UserService {
  appUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

  getUserList(level, amount, id?: any) {
    return this.http.get(environment.apiUrl + '/mng/users/' + level + '/' + amount + '/' + (id || '1'))
      .map((res: any) => res);
  }

  deleteUser(user: UserInfo): Observable<UserInfo> {
    const url = environment.apiUrl + '/mng/users/' + user['user_id'];
    const bodyString = JSON.stringify(user);
    const headers = { headers: { 'Content-Type': 'application/json' } };

  return this.http.delete<UserInfo>(url, headers)
    .map((res: UserInfo) => res);
      // .catch((error: any) => { console.log(error.message); });
  }
}

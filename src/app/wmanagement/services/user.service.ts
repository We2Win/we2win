import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  appUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

  getUserList() {
    return this.http.get(environment.apiUrl + '/mng/users')
      .map((res: any) => res);
  }

  deleteUser(user: User): Observable<User> {
    const url = environment.apiUrl + '/mng/users/' + user.ID;
    const bodyString = JSON.stringify(user);
    const headers = { headers: { 'Content-Type': 'application/json' } };

  return this.http.delete<User>(url, headers)
    .map((res: User) => res);
      // .catch((error: any) => { console.log(error.message); });
  }
}

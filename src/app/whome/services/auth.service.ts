import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  auth: boolean;
  checkAuth(): Observable<boolean> {
    return this.http.get('api/index.php')
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

    return this.http.post('api/', bodyString);
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
}

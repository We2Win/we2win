import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment.prod';
import { JwtHelper } from 'angular2-jwt';
import { UserInfo } from '../models/userInfo';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper,
    private authService: AuthService
  ) { }

  // getAll () {
  //   // return this.http.get<User[]>('/api');
  //   return this.http.get('/api/v1/infos')
  //     .map(data => { console.log('map: ', data); });
  // }
  // getById(id:
  //    string) {
  //   return this.http.get('/api/v1/infos');
  // }
  create(user: UserInfo) {
    console.log('user form create(): ', user);
    const bodyString = JSON.stringify(user);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post(environment.apiUrl + '/users', bodyString, headers)
      .map((res: UserInfo) => res)
      .catch((error: any) => this.handleError(error.message));
  }
  // update(user: UserInfo) {
  //   return this.http.put('/api/v1/infos', user);
  // }

  // delete(id: string) {
  //   return this.http.delete('/api/v1/infos');
  // }

  hasId(user) {
    console.log('user from hasId(): ', user);
    const bodyString = JSON.stringify(user);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post(environment.apiUrl + '/hasid', bodyString, headers)
      .map((data: any) => data.available)
      .catch((error: any) => Observable.throw(error.message));
  }

  testing() {
    console.log('testing...');
    return this.http.get(environment.apiUrl + '/testing')
      .map(data => { console.log('testing(): ', data); });
  }

  getBookmark(type) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

    return this.http.get(environment.apiUrl + '/bookmark/' + type, httpOptions);
  }

  addBookmark(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

    return this.http.put(environment.apiUrl + '/bookmark/add', body, httpOptions).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }

  removeBookmark(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

    return this.http.post(environment.apiUrl + '/bookmark/remove', body, httpOptions).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }

  getSchedule() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

    return this.http.get(environment.apiUrl + '/schedule', httpOptions);
  }

  addSchedule(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

    return this.http.put(environment.apiUrl + '/schedule/add', body, httpOptions).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }

  removeSchedule(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };

    return this.http.post(environment.apiUrl + '/schedule/remove', body, httpOptions).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}

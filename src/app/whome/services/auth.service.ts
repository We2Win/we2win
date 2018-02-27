import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { RequestOptions, Headers } from '@angular/http';
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
  login(user: User): Observable<boolean> {
    const bodyString = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    
    return this.http.post('api/', bodyString)
      .map(response => {
        console.log(response);
        if (response['auth'] === 1) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        console.log('Could not login');
        return Observable.of(false);
      });
  }
}

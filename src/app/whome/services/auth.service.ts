import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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
  login(user): Observable<boolean> {
    return this.http.post('api/', user)
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

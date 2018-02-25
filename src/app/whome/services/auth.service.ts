import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  auth: boolean;
  checkAuth(): Observable<boolean> {
    return this.http.get('auth.php')
      .map(response => {
        console.log(response);
        if (response['auth'] === 1) {
          return true;
        } else {
          return false;
        }
      });
  }
  login(u: string, p: string): Observable<boolean> {
    return this.http.post('auth.php', JSON.stringify({ 'user': u, 'pass': p }))
      .map(response => {
        console.log(response);
        if (response['auth'] === 1) {
          return true;
        } else {
          return false;
        }
      });
  }
}

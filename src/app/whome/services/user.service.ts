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
export class UserService {
  constructor(private http: HttpClient) { }

  getAll () {
    // return this.http.get<User[]>('/api');
    return this.http.get('/api/v1/infos')
      .map(data => { console.log('map: ', data); });
  }
  getById(id: string) {
    return this.http.get('/api/v1/infos');
  }
  create(user: User) {
    const bodyString = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('api/v1/infos', bodyString);
      // .map((res: User) => JSON.stringify(res))
      // .catch((error: any) => Observable.throw(error.message));
  }
  update(user: User) {
    return this.http.put('/api/v1/infos', user);
  }

  delete(id: string) {
    return this.http.delete('/api/v1/infos');
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

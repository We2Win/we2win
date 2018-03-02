import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Info } from '../models/info';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InfoService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Info[]>('/api');
  }
  getById(id: string) {
    return this.http.get('/api');
  }
  create(data: Info) {
    const bodyString = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/api/info/', bodyString);
    // .map((res: User) => JSON.stringify(res))
    // .catch((error: any) => Observable.throw(error.message));
  }
  update(user: Info) {
    return this.http.put('/api', user);
  }
  delete(id: string) {
    return this.http.delete('/api');
  }
  try() {
    // return this.http.get('http://ec2-13-124-14-176.ap-northeast-2.compute.amazonaws.com/api/');
    return this.http.get('/api');
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
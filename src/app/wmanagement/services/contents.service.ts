import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Info } from '../models/info';
import { Headers, RequestOptions, Response } from '@angular/http';
// yimport { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ContentsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getContentsList(page, list, sort, id?: any) {
    return this.http.get(environment.apiUrl + '/contents/' + page + '/' + list + '/' + sort + '/' + (id || '1'))
      .map((res: any) => res);
  }

  getContentsListByFiltering(page, amount, id?: any) {
    return this.http.get(environment.apiUrl + '/mng/contents/' + page + '/' + amount + '/' + (id || '1'))
      .map((res: any) => res);
  }

  searchContents(query) {
    return this.http.get(environment.apiUrl + '/mng/contents/' + query)
      .map((res: any) => res);
  }

  getCompanyInfo(type) {
    return this.http.get(environment.apiUrl + '/' + type)
      .map((res: any) => res);
  }

  updateCompanyInfo(type, data) {
    // console.log('hi updateContent()');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(environment.apiUrl + '/mng/dashboard/' + type, data)
      .map((res: any) => res);
  }

  updateContent(page, data) {
    // console.log('hi updateContent()');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(environment.apiUrl + '/contents', data)
      .map((res: any) => res);
  }

  getWeeklyList(page) {
    return this.http.get(environment.apiUrl + '/contents/' + page + '/weekly')
      .map((res: any) => res);
  }

  getContentsDetail(page, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };
    return this.http.get(environment.apiUrl + '/detail/' + page + '/' + id, httpOptions)
      .map((res: any) => res);
  }

  getSimplesList(page, sort, id?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };
    return this.http.get(environment.apiUrl + '/simples/' + page + '/' + sort + '/' + (id || '1'), httpOptions)
      .map((res: any) => res);
  }

  getRelatedList(page) {
    return this.http.get(environment.apiUrl + '/simples/' + page + '/weekly')
      .map((res: any) => res);
  }

  getSimplesDetail(page, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    };
    return this.http.get(environment.apiUrl + '/detail/' + page + '/' + id, httpOptions)
      .map((res: any) => res);
  }

  getDashboardContents() {
    return this.http.get(environment.apiUrl + '/mng/dashboard/contents');
  }

  getDashboardUsers() {
    return this.http.get(environment.apiUrl + '/mng/dashboard/users');
  }

  getEmployerList() {
    return this.http.get(environment.apiUrl + '/mng/employers')
      .map((res: any) => res);
  }

  getEmployeeList() {
    return this.http.get(environment.apiUrl + '/mng/employees')
      .map((res: any) => res);
  }

  getAnalysisContents() {
    return this.http.get(environment.apiUrl + '/mng/analysis');
  }

  setLevel(_body, level) {
    const body = {
      level: level,
      array: _body
    };
    return this.http.post(environment.apiUrl + '/mng/level', body);
  }

  confirmEmployers(_body, confirm) {
    const body = {
      confirm: confirm,
      array: _body
    };
    return this.http.post(environment.apiUrl + '/mng/employers', body);
  }

  confirmEmployees(_body, confirm) {
    const body = {
      confirm: confirm,
      array: _body
    };
    return this.http.post(environment.apiUrl + '/mng/employees', body);
  }

  create(_data: any) {
    // const bodyString = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(environment.apiUrl + '/contents', _data);
    // .map((res: User) => JSON.stringify(res))
    // .catch((error: any) => Observable.throw(error.message));
  }

  update(_data: any, type: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(environment.apiUrl + '/contents/' + type, _data);
  }
  delete(type, cId) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }

    return this.http.delete(environment.apiUrl + '/contents/' + type + '/' + cId, httpOptions)
      .map((res: any) => res);
  }
  try() {
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

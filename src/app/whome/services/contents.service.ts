/**
 * @file contents.component.ts
 * @author
 * @brief http contents service.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';

@Injectable()
export class ContentsService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService
  ) { }

  getContentsList(page, list, sort, id?: any) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }
    return this.http.get(environment.apiUrl + '/contents/' + page + '/' + list + '/' + sort + '/' + (id || '1'), httpOptions)
      .map((res: object) => {
        return res;
      });
  }

  getWeeklyList(page) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }
    return this.http.get(environment.apiUrl + '/contents/' + page + '/weekly', httpOptions)
      .map((res: any) => res);
  }

  getRankingList(page, date) {
    return this.http.get(environment.apiUrl + '/contents/ranking/' + page + '/' + date)
      .map((res: any) => res.content);
  }

  getContentsDetail(page, id) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }

    return this.http.get(environment.apiUrl + '/detail/' + page + '/' + id, httpOptions)
      .map((res: any) => res);
  }

  addComments(body) {
    const bodyString = JSON.stringify(body);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    // console.log('comments: ', body);

    return this.http.post(environment.apiUrl + '/contents/comments', bodyString, headers).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }

  getComments(cid) {
    return this.http.get(environment.apiUrl + '/contents/comments/' + cid)
      .map((res: any) => res);
  }

  getCompanyInfo(type) {
    return this.http.get(environment.apiUrl + '/' + type)
      .map((res: any) => res);
  }

  deleteComments(uid, cid) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }

    return this.http.delete(environment.apiUrl + '/contents/comments/' + cid + '/' + uid, httpOptions);
  }

  getSimplesList(page, sort, id?: any) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }

    return this.http.get(environment.apiUrl + '/simples/' + page + '/' + sort + '/' + (id || '1'), httpOptions)
      .map((res: any) => res);
  }

  getRelatedList(page) {
    return this.http.get(environment.apiUrl + '/simples/' + page + '/weekly')
      .map((res: any) => res);
  }

  getSimplesDetail(page, id) {
    const httpOptions = {};
    if (this.authService.isAuthenticated()) {
      httpOptions['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      });
    }

    return this.http.get(environment.apiUrl + '/detail/' + page + '/' + id, httpOptions)
      .map((res: any) => res);
  }

  getFilePath(cid) {
    return this.http.get(environment.apiUrl + '/file/' + cid)
      .map((res: any) => res);
  }

  search(query) {
    return this.http.get(environment.apiUrl + '/search/' + query)
      .map((res: any) => res);
  }

  addRecruitContent(page, body) {
    const bodyString = JSON.stringify(body);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.put(environment.apiUrl + '/contents/' + page, bodyString, headers).subscribe(
      res => {
        // console.log(res);
        this.alertService.success('등록 완료했습니다.');
      },
      error => {
        this.alertService.error('오류가 발생했습니다.');
      }
    );
  }

  countFbShare(cId) {

  }
}

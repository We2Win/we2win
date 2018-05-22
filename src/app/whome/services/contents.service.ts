import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(environment.apiUrl + '/contents/' + page + '/' + list + '/' + sort + '/' + (id || '1'))
      .map((res: any) => res);
  }

  getWeeklyList(page) {
    return this.http.get(environment.apiUrl + '/contents/' + page + '/weekly')
      .map((res: any) => res);
  }

  getContentsDetail(page, id) {
    return this.http.get(environment.apiUrl + '/detail/' + page + '/' + id)
      .map((res: any) => res);
  }

  addComments(body) {
    const bodyString = JSON.stringify(body);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post(environment.apiUrl + '/contents/comments/', bodyString, headers).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }

  getComments(cid) {
    return this.http.get(environment.apiUrl + '/contents/comments/' + cid)
      .map((res: any) => res);
  }

  getSimplesList(page, sort, id?: any) {
    console.log(environment.apiUrl + '/simples/' + page + '/' + sort + '/' + (id || '1'));
    return this.http.get(environment.apiUrl + '/simples/' + page + '/' + sort + '/' + (id || '1'))
      .map((res: any) => res);
  }

  getRelatedList(page) {
    return this.http.get(environment.apiUrl + '/simples/' + page + '/weekly')
      .map((res: any) => res);
  }

  getSimplesDetail(page, id) {
    return this.http.get(environment.apiUrl + '/detail/' + page + '/' + id)
      .map((res: any) => res);
  }

  getFilePath(cid) {
    return this.http.get(environment.apiUrl + '/file/' + cid)
      .map((res: any) => res);
  }

  addRecruitContent(page, body) {
    const bodyString = JSON.stringify(body);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.put(environment.apiUrl + '/contents/' + page, bodyString, headers).subscribe(
      res => {
        console.log(res);
        this.alertService.success('등록 완료했습니다.');
      },
      error => {
        this.alertService.error('오류가 발생했습니다.');
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContentsService {
  constructor(private http: HttpClient) { }

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

  addEmployerContent(body) {
    const bodyString = JSON.stringify(body);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post(environment.apiUrl + '/contents/comments/', bodyString, headers).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }
}

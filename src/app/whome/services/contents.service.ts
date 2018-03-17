import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContentsService {

  constructor(
    private http: HttpClient
  ) { }

  getNewsList() {
    return this.http.get(environment.apiUrl + '/contents/news')
      .map((res: any) => res);
  }
}

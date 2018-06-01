import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FbShareService implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  share(url, cId) {
    window['FB'].ui(
      {
        method: 'share',
        href: url
      }, function (response) { });

    return this.http.get(environment.apiUrl + '/countShare/' + cId)
      .map((res: any) => res);
  }
}

import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchService {
  public dataString = new Subject<any>();

  constructor(
    private http: HttpClient,
  ) {
  }

  updateData(data) {
    clearTimeout(window['setCount']);
    window['setCount'] = setTimeout(() => {
      console.log(data);
      this.search(data);
    }, 1000);
  }

  getDataString(): Observable<any> {
    return this.dataString;
  }

  search(string) {
    const headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.get(environment.apiUrl + '/search/' + string, headers).subscribe(
      res => {
        this.dataString.next(res['body']);
      },
      err => {
        console.log('search error: ', err);
      }
    );
  }
}

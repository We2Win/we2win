/**
 * @file search.service.ts
 * @author
 * @brief service for searching.
 */
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchService {
  public dataString = new Subject<any>();
  query;

  constructor(
    private http: HttpClient,
  ) {
  }

  updateData(data) {
    this.query = data;
    clearTimeout(window['setCount']);
    window['setCount'] = setTimeout(() => {
      // console.log(this.query);
      this.search(this.query, 1);
    }, 1000);
  }

  getDataString(): Observable<any> {
    return this.dataString;
  }

  search(string, page) {
    const headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.get(environment.apiUrl + '/search/' + string + '/' + page, headers).subscribe(
      res => {
        this.dataString.next({
          page: page,
          body: res['body']
        });
      },
      err => {
        // console.log('search error: ', err);
      }
    );
  }

  searchByPage(page) {
    this.search(this.query, page);
  }
}

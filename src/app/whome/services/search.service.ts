import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchService {
  public dataString = new Subject<string>();

  constructor(
    private http: HttpClient,
  ) {
  }

  updateData(data) {
    clearTimeout(window['setCount']);
    window['setCount'] = setTimeout(() => {
      console.log(data);
      // this.dataString.next(data);
      this.search(data);
    }, 1000);
  }

  getDataString(): Observable<any> {
    return this.dataString;
  }

  search(string) {
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.get(environment.apiUrl + '/search/' + string, headers).subscribe(
      res => { console.log(res); },
      error => { console.log(error); }
    );
  }
}

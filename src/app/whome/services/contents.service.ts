import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContentsService {
  constructor(
    private http: HttpClient
  ) { }

  addComments(id, body) {
    const bodyString = JSON.stringify(body);
    const headers = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post(environment.apiUrl + '/contents/' + id + '/comments/', bodyString, headers).subscribe(
      res => { console.log(res); }
    );
  }

  getRecentReportList() {
    return this.http.get(environment.apiUrl + '/contents/recentReport')
      .map((res: any) => res);
  }

  getWeeklyList() {
    return this.http.get(environment.apiUrl + '/contents/weekly')
      .map((res: any) => res);
  }

  getReportList(id?: any) {
    if (id) {
      // console.log('with id');
      return this.http.get(environment.apiUrl + '/contents/report/' + id)
        .map((res: any) => res);
    } else {
      // console.log('without id');
      return this.http.get(environment.apiUrl + '/contents/report')
        .map((res: any) => res);
    }
  }

  getNewsList(id?: any) {
    if (id) {
      // console.log('with id');
      return this.http.get(environment.apiUrl + '/contents/news/' + id)
        .map((res: any) => res);
    } else {
      // console.log('without id');
      return this.http.get(environment.apiUrl + '/contents/news')
        .map((res: any) => res);
    }
  }

  getLawList() {
    return this.http.get(environment.apiUrl + '/contents/law')
      .map((res: any) => res);
  }

  getApartmentList(id?: any) {
    if (id) {
      // console.log('with id');
      return this.http.get(environment.apiUrl + '/contents/apartment/' + id)
        .map((res: any) => res);
    } else {
      // console.log('without id');
      return this.http.get(environment.apiUrl + '/contents/apartment')
        .map((res: any) => res);
    }
  }
  getOfficetelList() {
    return this.http.get(environment.apiUrl + '/contents/officetel')
      .map((res: any) => res);
  }
  getCommercialList() {
    return this.http.get(environment.apiUrl + '/contents/commercial')
      .map((res: any) => res);
  }
  getGroundList() {
    return this.http.get(environment.apiUrl + '/contents/ground')
      .map((res: any) => res);
  }

  getMeetingList() {
    return this.http.get(environment.apiUrl + '/contents/meeting')
      .map((res: any) => res);
  }

  getEmployerList() {
    return this.http.get(environment.apiUrl + '/contents/employer')
      .map((res: any) => res);
  }

  getEmployeeList() {
    return this.http.get(environment.apiUrl + '/contents/employee')
      .map((res: any) => res);
  }
}

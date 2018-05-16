import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContentsService {
  constructor(
    private http: HttpClient
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
      res => { console.log(res); }
    );
  }

  getComments(cid) {
    return this.http.get(environment.apiUrl + '/contents/comments/' + cid)
      .map((res: any) => res);
  }

  getSimplesList(page, sort, id?: any) {
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
  // getRecentReportList() {
  //   return this.http.get(environment.apiUrl + '/contents/recentReport')
  //     .map((res: any) => res);
  // }



  // getReportList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/report/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/report')
  //       .map((res: any) => res);
  //   }
  // }

  // getNewsList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/news/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/news')
  //       .map((res: any) => res);
  //   }
  // }

  // getLawList() {
  //   return this.http.get(environment.apiUrl + '/contents/law')
  //     .map((res: any) => res);
  // }

  // getSiteList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/hotel/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/hotel')
  //       .map((res: any) => res);
  //   }
  // }

  // getApartmentList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/apartment/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/apartment')
  //       .map((res: any) => res);
  //   }
  // }

  // getOfficetelList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/officetel/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/officetel')
  //       .map((res: any) => res);
  //   }
  // }
  // getCommercialList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/commercial/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/commercial')
  //       .map((res: any) => res);
  //   }
  // }
  // getGroundList(id?: any) {
  //   if (id) {
  //     // console.log('with id');
  //     return this.http.get(environment.apiUrl + '/contents/ground/' + id)
  //       .map((res: any) => res);
  //   } else {
  //     // console.log('without id');
  //     return this.http.get(environment.apiUrl + '/contents/ground')
  //       .map((res: any) => res);
  //   }
  // }

  // getMeetingList() {
  //   return this.http.get(environment.apiUrl + '/contents/meeting')
  //     .map((res: any) => res);
  // }

  // getEmployerList() {
  //   return this.http.get(environment.apiUrl + '/contents/employer')
  //     .map((res: any) => { console.log(JSON.parse(res.list)); return res; });
  // }

  // getEmployeeList() {
  //   return this.http.get(environment.apiUrl + '/contents/employee')
  //     .map((res: any) => res);
  // }
}

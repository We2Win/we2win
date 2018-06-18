import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PutDataService {
  dataReport: EventEmitter<any> = new EventEmitter;
  dataNews: EventEmitter<any> = new EventEmitter;
  dataSite: EventEmitter<any> = new EventEmitter;
  dataMeeting: EventEmitter<any> = new EventEmitter;
  dataEmployee: EventEmitter<any> = new EventEmitter;
  dataEmployer: EventEmitter<any> = new EventEmitter;

  constructor() { }

  updateData(data, type) {
    // console.log('data: ', data, type);
    switch (type) {
      case '리포트':
        this.dataReport.emit(data);
      break;
      case '부동산 뉴스':
        this.dataNews.emit(data);
      break;
      case '아파트':
      case '오피스텔':
      case '상가/호텔':
      case '토지':
        this.dataSite.emit(data);
      break;
      case '오프라인 모임':
        this.dataMeeting.emit(data);
      break;
      case '구인':
        this.dataEmployee.emit(data);
      break;
      case '구직':
        this.dataEmployer.emit(data);
      break;
    }
  }

}

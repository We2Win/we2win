import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UploadFileService {
  FOLDER = 'user-s3/';

  private dataList = {
    'master-image': new Subject<any>(),
    'slave-image1': new Subject<any>(),
    'slave-image2': new Subject<any>(),
    'slave-image3': new Subject<any>(),
    'slave-image4': new Subject<any>(),
    'slave-image5': new Subject<any>(),
    'file': new Subject<any>()
  };

  bucket = new S3(
    {
      accessKeyId: environment.bucket.accessKeyId,
      secretAccessKey: environment.bucket.secretAccessKey,
      region: environment.bucket.region
    }
  );

  constructor() { }

  uploadFile(file, columnName) {
    let date = new Date().toISOString();
    date = date.substr(2, 8) + '/' + date.substr(11, 17);
    const params = {
      Bucket: 'we2winimage',
      Key: this.FOLDER + date + file.name,
      Body: file
    };

    this.bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
      } else {
        console.log('Successfully uploaded file.', data);
        console.log(this.dataList);
        this.dataList[columnName].next(data);
      }
    });
  }

  getFileName(columnName): Observable<any> {
    return this.dataList[columnName].asObservable();
  }

  resetFile() {
    // tslint:disable-next-line:forin
    for (const i in this.dataList) {
      this.dataList[i] = new Subject<any>();
    }
  }
}

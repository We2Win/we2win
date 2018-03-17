import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UploadFileService {
  FOLDER = 'user-s3/';

  private subject = new Subject<any>();

  bucket = new S3(
    {
      accessKeyId: environment.bucket.accessKeyId,
      secretAccessKey: environment.bucket.secretAccessKey,
      region: environment.bucket.region
    }
  );

  constructor() { }

  uploadFile(file) {
    const params = {
      Bucket: 'we2winimage',
      Key: this.FOLDER + file.name,
      Body: file
    };

    this.bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
      } else {
        console.log('Successfully uploaded file.', data);
        this.subject.next(data);
      }
    });
  }

  getFileName(): Observable<any> {
    return this.subject.asObservable();
  }
}

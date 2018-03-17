import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadFileService {
  FOLDER = 'user-s3/';

  constructor() { }

  uploadfile(file): Observable<any> {

    const bucket = new S3(
      {
        accessKeyId: environment.bucket.accessKeyId,
        secretAccessKey: environment.bucket.secretAccessKey,
        region: environment.bucket.region
      }
    );

    const params = {
      Bucket: 'we2winimage',
      Key: this.FOLDER + file.name,
      Body: file
    };

    const result: any = bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      } else {
        console.log('Successfully uploaded file.', data);
        return data.Key;
      }
    });

    return result;
  }
}

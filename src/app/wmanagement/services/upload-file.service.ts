import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';

@Injectable()
export class UploadFileService {
  FOLDER = 'user-s3/';

  constructor() { }

  uploadfile(file) {

    const bucket = new S3(
      {
        accessKeyId: environment.bucket.accessKeyId,
        secretAccessKey: environment.bucket.secretAccessKey,
        region: environment.bucket.region
      }
    );

    const params = {
      Bucket: 'jsa-angular4-bucket',
      Key: this.FOLDER + file.name,
      Body: file
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      } else {
        console.log('Successfully uploaded file.', data);
        return true;
      }
    });
  }
}

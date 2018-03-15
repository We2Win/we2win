import { Injectable } from '@angular/core';
// yimport { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File) {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    // return this.httpClient
    //   .post(endpoint, formData, { headers: yourHeadersConfig })
    //   .map(() => true)
    //   .catch((e) => this.handleError(e));
  }

}

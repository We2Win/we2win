import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ContentsService } from './contents.service';

@Injectable()
export class FbShareService implements OnInit {

  constructor(
    private contentService: ContentsService
  ) { }

  ngOnInit() {
  }

  share(url, cId) {
    window['FB'].ui(
      {
        method: 'share',
        href: url
      }, function (response) { });

    this.contentService.countFbShare(cId);
  }
}

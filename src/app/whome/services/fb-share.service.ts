import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class FbShareService implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  share(url) {
    window['FB'].ui(
      {
        method: 'share',
        href: url
      }, function (response) { });
  }
}

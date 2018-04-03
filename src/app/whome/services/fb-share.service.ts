import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class FbShareService implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  share() {
    window['FB'].ui(
      {
        method: 'share',
        href: 'https://developers.facebook.com/docs/'
      }, function (response) { });
  }
}

import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class FbShareService implements OnInit {
  FB;

  constructor() { }

  ngOnInit() {
    this.fbAsyncInit();

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fbAsyncInit() {
    this.FB.init({
      appId: 'your-app-id',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.12'
    });
  }

  share() {
    this.FB.ui(
      {
        method: 'share',
        href: 'https://developers.facebook.com/docs/'
      }, function (response) { });
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-naver-login',
  templateUrl: './naver-login.component.html',
  styleUrls: ['./naver-login.component.css']
})
export class NaverLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const naverLogin = new window['naver'].LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.callbackUrl,
        isPopup: false,
        callbackHandle: true
      }
    );

    naverLogin.init();

    window.addEventListener('load', () => {
      naverLogin.getLoginStatus(status => {
        if (status) {
          const email = naverLogin.user.getEmail();
          console.log(email);
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  }

}

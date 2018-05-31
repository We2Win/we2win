import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-naver-login',
  templateUrl: './naver-login.component.html',
  styleUrls: ['./naver-login.component.css']
})
export class NaverLoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

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

    // console.log(window.location.pathname, window.location.href);

    // const token = window.location.href.split('#access_token=')[1].split('&')[0];
    // console.log(token);

    // this.authService.getNaverLoginStatus(token);

    window.addEventListener('load', () => {
      window['naverLogin'].getLoginStatus(status => {
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

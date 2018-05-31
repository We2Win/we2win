import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-naver-login',
  templateUrl: './naver-login.component.html',
  styleUrls: ['./naver-login.component.css']
})
export class NaverLoginComponent implements OnInit {
  userInfo: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // const naverLogin = new window['naver'].LoginWithNaverId(
    //   {
    //     clientId: environment.naver.clientId,
    //     callbackUrl: environment.naver.callbackUrl,
    //     isPopup: false,
    //     callbackHandle: true
    //   }
    // );

    // naverLogin.init();

    // console.log(window.location.pathname, window.location.href);

    // const token = window.location.href.split('#access_token=')[1].split('&')[0];
    // console.log(token);

    // this.authService.getNaverLoginStatus(token);

    window.addEventListener('load', () => {
      window['naverLogin'].getLoginStatus(status => {
        if (status) {
          const userInfo = {
            email: window['naverLogin'].user.getEmail(),
            name: window['naverLogin'].user.getNickName()
          };
          this.userInfo.emit(userInfo);
          this.router.navigate(['signup', 'form']);
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  }

  getUrl() {
    return window['naverLogin'].generateAuthorizeUrl();
  }

}

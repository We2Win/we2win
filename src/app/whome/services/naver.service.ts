import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class NaverService {
  public Naver;

  constructor() {
    this.Naver = new window['naver'].LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        callbackHandle: true,
        callbackUrl: environment.naver.callbackUrl,
        // loginButton: { color: 'green', type: 3, height: 48 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    this.Naver.init();
  }

  check() {
    window.addEventListener('load', () => {
      console.log('starting..');
      this.Naver.getLoginStatus(status => {
        if (status) {
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          const email = this.Naver.user.getEmail();
          console.log('email: ', email);
          // if (email == undefined || email == null) {
          //   alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
          //   /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
          //   naverLogin.reprompt();
          //   return;
          // }

          // this.router.navigate(['signup', 'form']);

        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  }

  getUrl() {
    return this.Naver.generateAuthorizeUrl();
  }

}

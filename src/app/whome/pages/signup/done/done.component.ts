import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const naverLogin = new window['naver'].LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.registerUrl,
        isPopup: false,
        callbackHandle: true
      }
    );

    naverLogin.init();

    window.addEventListener('load', function () {
      console.log('starting..');
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          const email = naverLogin.user.getEmail();
          console.log('email: ', email);
          // if (email == undefined || email == null) {
          //   alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
          //   /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
          //   naverLogin.reprompt();
          //   return;
          // }

          this.router.navigate(['signup', 'form']);

        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });

  }

}

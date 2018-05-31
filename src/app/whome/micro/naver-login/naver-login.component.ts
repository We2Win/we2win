import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-naver-login',
  templateUrl: './naver-login.component.html',
  styleUrls: ['./naver-login.component.css']
})
export class NaverLoginComponent implements OnInit {
  userInfo: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('initiated.');

    window.addEventListener('load', () => {
      window['naverLogin'].getLoginStatus(status => {
        console.log('status: ', status);
        if (status) {
          const userInfo = {
            email: window['naverLogin'].user.getEmail(),
            id: window['naverLogin'].user.getId(),
            nickname: window['naverLogin'].user.getNickName()
          };
          console.log('userInfo: ', userInfo);
          localStorage.setItem('naverAuth', JSON.stringify(userInfo));
          const naverAuth = JSON.parse(localStorage.getItem('naverAuth'));
          console.log(naverAuth);
          if (naverAuth) {
            const user = {
              'user_id': 'n_' + naverAuth.id,
            };
            this.authService.loginWithKakao(user).subscribe(
              auth => {
                console.log('auth: ', auth);
                if (auth) {
                  this.router.navigate(['/']);
                } else {
                  this.alertService.error('회원 정보를 불러오지 못했습니다.');
                  // this.alertService.error('아이디 또는 비밀번호가\n맞지 않습니다.');
                }
              },
              err => {
                if (err.status === 422) {
                  this.alertService.error('아이디 또는 비밀번호가\n맞지 않습니다.');
                } else {
                  this.alertService.error('로그인 중 오류가\n발생했습니다.');
                }
              }
            );
          }
          // this.router.navigate(['/']);
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  }

  getUrl() {
    window.location.href = window['naverLogin'].generateAuthorizeUrl();
  }

}

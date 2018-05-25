import { Component, OnInit, HostBinding, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';

// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/shareReplay';

import { Token } from '../../models/token';
import { fadeInAnimation } from '../../../animations/animation';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../../environments/environment';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserInfo } from '../../models/userInfo';
// yimport { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, JwtHelper],
  animations: [fadeInAnimation],
  // host: { '[@animations]': '' }
})
export class LoginComponent implements OnInit, AfterViewInit {
  @HostBinding('@fadeInAnimation') fadeInAnimation;

  // we want to actually subscribe to the boolean of the observable
  loginForm: FormGroup;
  post: any;
  // private user = new UserInfo();
  private user;

  TOKEN_NAME = 'jwt_token';

  loginType;

  root;
  naverLogin;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private jwtHelper: JwtHelper,
    private alertService: AlertService,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) {
    this.loginForm = fb.group({
      'u-id': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // this.info('로그인을 해주세요');
    this.loginForm = new FormGroup({
      'u-id': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    this.naverLogin = new window['naver'].LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.callbackUrl,
        isPopup: true, /* 팝업을 통한 연동처리 여부 */
        loginButton: { color: 'green', type: 4, height: 50 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    /* 설정정보를 초기화하고 연동을 준비 */
    this.naverLogin.init();

    this.naverLogin.getLoginStatus(function (status) {
      if (status) {
        /* 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
        const email = this.naverLogin.user.getEmail();
        console.log('email: ', email);
        if (email == undefined || email == null) {
          alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
          /* 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
          this.naverLogin.reprompt();
          return;
        }

        window.location.replace('처리후 되돌아갈 곳');
      } else {
        console.log('callback 처리에 실패하였습니다.');
      }
    });

    if (!window['Kakao'].Auth) {
      window['Kakao'].init(environment.kakao.clientId);
    }
    // 카카오 로그인 버튼을 생성합니다.
    window['Kakao'].Auth.createLoginButton({
      container: '#kakaoIdLogin',
      success: authObj => {
        window['Kakao'].API.request({
          url: '/v1/user/me',
          success: authInfo => {
            const user = {
              'user_id': 'k_' + authInfo.id,
            };

            console.log('authInfo: ', authInfo);

            this.authService.loginWithKakao(user).subscribe(
              auth => {
                console.log('auth: ', auth);
                if (auth) {
                  this.router.navigate(['/']);
                } else {
                  this.error('회원 정보를 불러오지 못했습니다.');
                  // this.error('아이디 또는 비밀번호가\n맞지 않습니다.');
                }
              },
              err => {
                if (err.status === 422) {
                  this.error('아이디 또는 비밀번호가\n맞지 않습니다.');
                } else {
                  this.error('로그인 중 오류가\n발생했습니다.');
                }
              }
            );
          },
          fail: err => {
            this.error(JSON.stringify(err));
          }
        });
      },
      fail: (err) => {
        this.error(JSON.stringify(err));
      }
    });

  }

  setLoginType(loginType) {
    this.loginType = loginType;
    if (this.loginType === 'naver') {
      // alert('네이버 로그인 팝업');
      // this.router.navigate(['/']);
      this.loginWithNaver();
    } else if (this.loginType === 'kakao') {
      // this.info('카카오 로그인 팝업');
      // this.router.navigate(['/']);
    }
  }

  onSubmit(user): void {
    // console.log(user);
    if (this.loginForm.valid) {
      user = this.loginForm.value;
      user.isLogin = true;
      this.authService.login(user).subscribe(
        auth => {
          // console.log(auth);
          if (auth) {
            this.router.navigate(['/']);
          } else {
            this.error('아이디 또는 비밀번호가\n맞지 않습니다.');
          }
        },
        err => {
          if (err.status === 422) {
            this.error('아이디 또는 비밀번호가\n맞지 않습니다.');
          } else {
            this.error('로그인 중 오류가\n발생했습니다.');
          }
        }
      );
    } else {
      this.error('아이디 또는 비밀번호를\n입력하지 않으셨습니다.');
    }
  }

  loginWithNaver() {
    // this.naverLogin.getLoginStatus(function (status) {
    //   if (status) {
    //     /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
    //     const email = this.naverLogin.user.getEmail();
    //     if (email == undefined || email == null) {
    //       alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
    //       /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
    //       this.naverLogin.reprompt();
    //       return;
    //     }

    //     window.location.replace("http://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/sample/main.html");
    //   } else {
    //     console.log("callback 처리에 실패하였습니다.");
    //   }
    // });

    const naver_id_login = new window['naver_id_login']('Wubf2TBn_Q6UWKJRyT1Y', 'http://localhost:4200/callback');
    const state = naver_id_login.getUniqState();
    naver_id_login.setDomain(environment.homeUrl);
    // naver_id_login.setDomain('http://localhost:4200/callback');
    naver_id_login.setState(state);
    naver_id_login.setButton('white', 2, 40);
    naver_id_login.init_naver_id_login();

  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }
}

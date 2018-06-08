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
  findIdForm: FormGroup;
  findPasswordForm: FormGroup;
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

    this.findIdForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required])
    });

    this.findPasswordForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'u-id': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
    this.naverLogin = new window['naver'].LoginWithNaverId(
      {
        clientId: environment.naver.clientId,
        callbackUrl: environment.naver.callbackUrl,
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: { color: 'green', type: 4, height: 50 } /* 로그인 버튼의 타입을 지정 */
      }
    );

    /* 설정정보를 초기화하고 연동을 준비 */
    this.naverLogin.init();

    this.elementRef.nativeElement.querySelector('#naverIdLogin').setAttribute('onclick', 'return false;');

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
                  this.alertService.error('회원 정보를 불러오지 못했습니다.');
                  // this.alertService.error('아이디 또는 비밀번호가\n맞지 않습니다.');
                }
              },
              err => {
                if (err.status === 422) {
                  this.alertService.error('회원가입을 하지 않았거나 아이디, 비밀번호가\n맞지 않습니다.');
                } else {
                  this.alertService.error('로그인 중 오류가\n발생했습니다.');
                }
              }
            );
          },
          fail: err => {
            this.alertService.error(JSON.stringify(err));
          }
        });
      },
      fail: (err) => {
        this.alertService.error(JSON.stringify(err));
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
            this.alertService.error('아이디 또는 비밀번호가\n맞지 않습니다.');
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
    } else {
      this.alertService.error('아이디 또는 비밀번호를\n입력하지 않으셨습니다.');
    }
  }

  onSubmitId() {
    if (this.findIdForm.valid) {
      console.log(this.findIdForm.value);
      this.authService.sendInfoForId(this.findIdForm);

    } else {
      this.alertService.error('양식을 모두\n입력하지 않으셨습니다.');
    }
  }

  onSubmitPassword() {
    if (this.findPasswordForm.valid) {

    } else {
      this.alertService.error('양식을 모두\n입력하지 않으셨습니다.');
    }
    console.log(this.findPasswordForm);
  }

  loginWithNaver() {

  }

  findInfo() {
    this.elementRef.nativeElement.querySelector('app-popup').classList.add('show');
  }


}

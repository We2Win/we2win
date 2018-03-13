import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';

// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/shareReplay';

import { User } from '../../models/user';
import { Token } from '../../models/token';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, JwtHelper]
})
export class LoginComponent implements OnInit {
  // we want to actually subscribe to the boolean of the observable
  loginForm: FormGroup;
  post: any;
  private user: User;

  TOKEN_NAME = 'jwt_token';

  loginType;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private jwtHelper: JwtHelper
  ) {
    this.loginForm = fb.group({
      'ID': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });

    this.loginForm = new FormGroup({
      ID: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });

  }

  setLoginType(loginType) {
    this.loginType = loginType;
    if (this.loginType === 'naver') {
      alert('네이버 로그인 팝업');
      this.router.navigate(['/']);
    } else if (this.loginType === 'kakao') {
      alert('카카오 로그인 팝업');
      this.router.navigate(['/']);
    }
  }

  onSubmit(user): void {
    alert('why!!');
    console.log(user);
    if (this.loginForm.valid) {
      user = this.loginForm.value;
      user.isLogin = true;
      this.authService.login(user).subscribe(auth => {
        console.log(auth);
        if (auth) {
          // this.router.navigate(['/']);
        } else {
          alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }
      });
    } else {
      console.log('loginForm not valid!');
    }
  }
}

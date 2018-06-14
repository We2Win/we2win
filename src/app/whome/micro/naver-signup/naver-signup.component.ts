/**
 * @file naver-login.component.ts
 * @author
 * @brief dealing with naver callbacks.
 */
import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-naver-signup',
  templateUrl: './naver-signup.component.html',
  styleUrls: ['./naver-signup.component.css']
})
export class NaverSignupComponent implements OnInit {
  userInfo: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
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
          this.userInfo.emit(userInfo);
          localStorage.setItem('naverAuth', JSON.stringify(userInfo));
          this.router.navigate(['signup', 'form']);
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  }

}

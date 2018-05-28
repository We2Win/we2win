import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../animations/animation';
import { AlertService } from './services/alert.service';
import { NaverService } from './services/naver.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-whome',
  templateUrl: './whome.component.html',
  styleUrls: ['./whome.component.css'],
  animations: [fadeInAnimation],
})
export class WhomeComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private naverService: NaverService
  ) { }

  ngOnInit() {
    if (!this.naverService.isStarted()) {
      console.log('executing NaverService');
      const naver = new window['naver'].LoginWithNaverId(
        {
          clientId: environment.naver.clientId,
          isPopup: false, /* 팝업을 통한 연동처리 여부 */
          // callbackHandle: true,
          callbackUrl: environment.naver.callbackUrl,
          // loginButton: { color: 'green', type: 3, height: 48 } /* 로그인 버튼의 타입을 지정 */
        }
      );

      naver.init();
      this.naverService.create(naver);
      this.naverService.check();
    } else {
      this.naverService.check();
    }
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

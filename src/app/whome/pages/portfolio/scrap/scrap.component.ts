import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInfo } from '../../../models/userInfo';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.css']
})
export class ScrapComponent implements OnInit {
  userInfo;
  records;

  constructor(
    private _elementRef: ElementRef,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    this.records = this.userService.getBookmark('info').subscribe(
      res => {
        this.records = res['contents'];
        console.log(res);
      },
      err => this.alertService.error('에러가 발생했습니다.')
    );
  }

  showInfo() {
    this._elementRef.nativeElement.querySelector('li.info').classList.add('show');
    this._elementRef.nativeElement.querySelector('li.site').classList.remove('show');
    this._elementRef.nativeElement.querySelector('div.info').classList.add('show');
    this._elementRef.nativeElement.querySelector('div.site').classList.remove('show');
  }

  showSite() {
    this._elementRef.nativeElement.querySelector('li.info').classList.remove('show');
    this._elementRef.nativeElement.querySelector('li.site').classList.add('show');
    this._elementRef.nativeElement.querySelector('div.info').classList.remove('show');
    this._elementRef.nativeElement.querySelector('div.site').classList.add('show');
  }
}

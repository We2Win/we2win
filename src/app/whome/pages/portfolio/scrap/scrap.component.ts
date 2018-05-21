import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.css']
})
export class ScrapComponent implements OnInit {
  userInfo;

  constructor(
    private _elementRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
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

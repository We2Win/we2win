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

/**
 * @file whome.component.ts
 * @author
 * @brief layout the main page, and routing to specific pages.
 */
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
  ) { }

  ngOnInit() {
  }
}

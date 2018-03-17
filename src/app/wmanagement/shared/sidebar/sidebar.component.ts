import { Component, OnInit, ElementRef } from '@angular/core';
import { PageInfoService } from '../../page-info.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [PageInfoService, AuthService],
})
export class SidebarComponent implements OnInit {
  navTree: Array<Object> = this.pageInfoService.navTree;
  userId;
  constructor(
    private pageInfoService: PageInfoService,
    private _elementRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserInfo().user_id;
  }

}

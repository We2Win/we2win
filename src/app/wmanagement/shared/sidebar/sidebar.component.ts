import { Component, OnInit, ElementRef } from '@angular/core';
import { PageInfoService } from '../../page-info.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [PageInfoService],
})
export class SidebarComponent implements OnInit {
  navTree: Array<Object> = this.pageInfoService.navTree;
  constructor(
    private pageInfoService: PageInfoService,
    private _elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

}

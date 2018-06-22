import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentsService } from '../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { PostingService } from '../../services/posting.service';
import { MypostDirective } from '../../directives/mypost.directive';
import { PostItem } from '../../models/post-item';
import { environment } from '../../../../environments/environment';
import { ChartComponent } from '../../micro/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../pages.css'
  ],
  providers: [PostingService]
})
export class DashboardComponent implements OnInit {
  date = new Date();
  @ViewChild('infoPie') infoPie;
  @ViewChild('infoBar') infoBar;

  data = {
    'users': {},
    'contents': {},
    'logs': {},
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private contentsService: ContentsService,
    private postingService: PostingService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.contentsService.getDashboardUsers().subscribe(
      data => {
        // console.log('users: ', data);
        this.data['users'] = data['users'];
        this.infoPie.chartObject.update();
      },
      error => {
        console.error(error);
      }
    );

    this.contentsService.getDashboardContents().subscribe(
      data => {
        // console.log('contents: ', data);
        this.data['contents'] = data['contents'];
        this.data['logs'] = data['logs'];
        this.infoBar.chartObject.update();
      },
      error => {
        console.error(error);
      }
    );


    // setTimeout(() => {
    //   this.addData(this.infoPie);
    // }, 100);
  }

  // addData(component) {
  //   component.chartObject.update();
  // }
}

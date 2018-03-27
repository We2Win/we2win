import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { Info } from '../../../models/info';
import { environment } from '../../../../../environments/environment';
import { ChartComponent } from '../../../micro/chart/chart.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css'],
  providers: [ContentsService, PostingService]
})
export class SiteDetailComponent implements OnInit {
  Data = new Info();
  id: number;
  imgUrl;
  subImgUrl = ['', '', '', '', ''];
  selectedImgUrl = '';
  selectedNum = '';

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @ViewChild('NewComment') NewComment;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private contentsService: ContentsService,
    private postingService: PostingService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    this.contentsService.getApartmentList(this.id).subscribe(
      data => {
        if (data) {
          this.Data = JSON.parse(data.body);
          console.log(this.Data);
          const current = {
            type: 'infoDetail',
            num: '0',
            labels: [
              this.Data['S-current-duration1'],
              this.Data['S-current-duration2'],
              this.Data['S-current-duration3'],
              this.Data['S-current-duration4'],
              this.Data['S-current-duration5'],
            ],
            datasets: [{
              data: [
                parseInt(this.Data['S-current-amount1'], 10),
                parseInt(this.Data['S-current-amount2'], 10),
                parseInt(this.Data['S-current-amount3'], 10),
                parseInt(this.Data['S-current-amount4'], 10),
                parseInt(this.Data['S-current-amount5'], 10),
              ]
            }]
          };
          const around = {
            type: 'infoDetail',
            num: '1',
            labels: [
              this.Data['S-around-duration1'],
              this.Data['S-around-duration2'],
              this.Data['S-around-duration3'],
              this.Data['S-around-duration4'],
              this.Data['S-around-duration5'],
            ],
            datasets: [{
              data: [
                parseInt(this.Data['S-around-amount1'], 10),
                parseInt(this.Data['S-around-amount2'], 10),
                parseInt(this.Data['S-around-amount3'], 10),
                parseInt(this.Data['S-around-amount4'], 10),
                parseInt(this.Data['S-around-amount5'], 10),
              ]
            }]
          };
          this.addChart(current);
          this.addChart(around);

          this.imgUrl = environment.bucket.downloadUrl + this.Data['S-image'];
          this.subImgUrl[1] = environment.bucket.downloadUrl + this.Data['S-subImage1'];
          this.subImgUrl[2] = environment.bucket.downloadUrl + this.Data['S-subImage2'];
          this.subImgUrl[3] = environment.bucket.downloadUrl + this.Data['S-subImage3'];
          this.subImgUrl[4] = environment.bucket.downloadUrl + this.Data['S-subImage4'];
          this.subImgUrl[5] = environment.bucket.downloadUrl + this.Data['S-subImage5'];
          this.selectedImgUrl = environment.bucket.downloadUrl + this.Data['S-subImage1'];

          console.log('data: ', this.Data);
        }
      }
    );
  }

  selectImg(num) {
    this.selectedImgUrl = this.subImgUrl[num];
    this.selectedNum = num;
  }

  addChart(record) {
    this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
      new PostItem(ChartComponent, record));
  }

  addComment() {
    console.log(this.auth.getUserInfo());
  }
}

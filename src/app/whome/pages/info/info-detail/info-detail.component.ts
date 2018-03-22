import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { Info } from '../../../models/info';
import { environment } from '../../../../../environments/environment';
import { ChartComponent } from '../../../micro/chart/chart.component';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css'],
  providers: [ContentsService, PostingService]
})
export class InfoDetailComponent implements OnInit {
  Data = new Info();
  id: number;
  imgUrl;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private contentsService: ContentsService,
    private postingService: PostingService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    this.contentsService.getReportList(this.id).subscribe(
      data => {
        if (data) {
          this.Data = JSON.parse(data.body);
          console.log(this.Data);
          const current = {
            type: 'infoDetail',
            num: '0',
            labels: [
              this.Data['I-current-duration1'],
              this.Data['I-current-duration2'],
              this.Data['I-current-duration3'],
              this.Data['I-current-duration4'],
              this.Data['I-current-duration5'],
            ],
            datasets: [{
              data: [
                parseInt(this.Data['I-current-amount1'], 10),
                parseInt(this.Data['I-current-amount2'], 10),
                parseInt(this.Data['I-current-amount3'], 10),
                parseInt(this.Data['I-current-amount4'], 10),
                parseInt(this.Data['I-current-amount5'], 10),
              ]
            }]
          };
          const around = {
            type: 'infoDetail',
            num: '1',
            labels: [
              this.Data['I-around-duration1'],
              this.Data['I-around-duration2'],
              this.Data['I-around-duration3'],
              this.Data['I-around-duration4'],
              this.Data['I-around-duration5'],
            ],
            datasets: [{
              data: [
               parseInt( this.Data['I-around-amount1'], 10),
               parseInt( this.Data['I-around-amount2'], 10),
               parseInt( this.Data['I-around-amount3'], 10),
               parseInt( this.Data['I-around-amount4'], 10),
               parseInt( this.Data['I-around-amount5'], 10),
              ]
            }]
          };
          this.addChart(current);
          this.addChart(around);

          this.imgUrl = environment.bucket.downloadUrl + this.Data['I-image'];
        }
      }
    );
    console.log(this.Data);
  }

  addChart(record) {
    this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
      new PostItem(ChartComponent, record));
  }
}


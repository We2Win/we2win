import { Component, OnInit } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { Info } from '../../../models/info';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css'],
  providers: [ContentsService]
})
export class InfoDetailComponent implements OnInit {
  Data: Info;
  id: number;
  imgUrl;

  constructor(
    private contentsService: ContentsService,
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
          this.imgUrl = environment.bucket.downloadUrl + this.Data['I-image'];
        }
      }
    );
  }
}

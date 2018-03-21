import { Component, OnInit } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { Info } from '../../../models/info';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  Data: Info;
  id: number;

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
        }
      }
    );
  }

}

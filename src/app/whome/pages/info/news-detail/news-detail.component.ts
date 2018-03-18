import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [ContentsService]
})
export class NewsDetailComponent implements OnInit {
  Data: object;
  id: number;

  constructor(
    private contentsService: ContentsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.params['value'].id;
  }

  ngOnInit() {
    this.contentsService.getNewsList(this.id).subscribe(
      data => {
        if (data) {
          this.Data = JSON.parse(data.body);
          console.log(this.Data);
        }
      }
    );
  }

}

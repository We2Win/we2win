import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [ContentsService]
})
export class NewsDetailComponent implements OnInit {
  Data: object;
  id: number;
  @ViewChild('background') background;
  @ViewChild('top') top;

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
          // this.top.nativeElement.style.background = 'red';
          this.background.nativeElement.src = environment.bucket.downloadUrl + this.Data['N-image'];
          // this.top.nativeElement.style.backgroundSize = 'cover';
          // this.top.nativeElement.style.backgroundPosition = 'center';
          console.log(this.Data);
        }
      }
    );
  }

}

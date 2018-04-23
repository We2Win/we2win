import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { SiteCardComponent } from '../../../micro/site-card/site-card.component';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css'],
  providers: [ContentsService, PostingService]
})
export class CommercialComponent implements OnInit {
  Data: Array<object>;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('commercial').subscribe(
      data => {
        if (data) {
          // console.log(data);
          this.Data = data;
          this.addRecord(this.Data);
        }
      }
    );
  }

  addRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.mypostDirective.viewContainerRef,
        new PostItem(SiteCardComponent, records[record]));
    }
  }

}

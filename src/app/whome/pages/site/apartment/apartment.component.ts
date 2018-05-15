import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { SiteCardComponent } from '../../../micro/site-card/site-card.component';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css'],
  providers: [ContentsService, PostingService]
})
export class ApartmentComponent implements OnInit {
  Data: Array<object>;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('apartment').subscribe(
      data => {
        if (data) {
          console.log(data);
          // this.Data = data;
          // this.addRecord(this.Data);
        }
      },
      err => {
        console.error(err);
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

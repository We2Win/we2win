import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { LawCardComponent } from '../../../micro/law-card/law-card.component';

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.css'],
  providers: [ContentsService, PostingService]
})
export class LawComponent implements OnInit {
  Data: Array<object>;
  currentPage = 1;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('law', 'newly', 'date', this.currentPage).subscribe(
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
        new PostItem(LawCardComponent, records[record]));
    }
  }

}

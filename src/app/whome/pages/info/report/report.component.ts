import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ContentsService, PostingService]
})
export class ReportComponent implements OnInit {
  Data: Array<object>;

  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('report').subscribe(
      data => {
        if (data) {
          console.log(data);
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
        new PostItem(InfoCardComponent, records[record]));
    }
  }

}

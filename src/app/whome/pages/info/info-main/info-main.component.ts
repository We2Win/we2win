import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';
import { PostingService } from '../../../services/posting.service';
import { MypostDirective } from '../../../directives/mypost.directive';
import { PostItem } from '../../../models/post-item';
import { InfoCardComponent } from '../../../micro/info-card/info-card.component';
import { Rankingpost1Directive, Rankingpost2Directive } from '../../../directives/rankingpost.directive';

@Component({
  selector: 'app-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.css'],
  providers: [ContentsService, PostingService]
})

export class InfoMainComponent implements OnInit {
  NewlyList: Array<object>;
  WeeklyList: Array<object>;
  @Input() recentRecords;
  @Input() weeklyRecords;

  @ViewChild(Rankingpost1Directive)
  private rankingpost1Directive: Rankingpost1Directive;

  @ViewChild(Rankingpost2Directive)
  private rankingpost2Directive: Rankingpost2Directive;

  postItems: PostItem[];

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getContentsList('info/newly', 1).subscribe(
      data => {
        if (data.list) {
          console.log('Newly List: ', data);
          this.NewlyList = JSON.parse(data.list);
          this.addNewlyRecord(this.NewlyList);
        }
      }
    );

    this.contentsService.getContentsList('info/weekly', 1).subscribe(
      data => {
        if (data.list) {
          console.log('Weekly List: ', data);
          this.WeeklyList = JSON.parse(data.list);
          this.addWeeklyRecord(this.WeeklyList);
        }
      }
    );
  }

  addNewlyRecord(records) {
    // tslint:disable-next-line:forin
    for (const record in records) {
      // console.log('record: ', records[record]);
      this.postingService.loadComponent(this.rankingpost1Directive.viewContainerRef,
        new PostItem(InfoCardComponent, records[record]));
    }
  }

  addWeeklyRecord(records) {
    const count = ['first', 'second', 'third'];
    for (const num in count) {
      if (records[num]) {
        records[num]['rank'] = count[num];
        // console.log('record: ', records[record]);
        this.postingService.loadComponent(this.rankingpost2Directive.viewContainerRef,
          new PostItem(InfoCardComponent, records[num]));
      }
    }
  }
}

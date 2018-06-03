import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { PostingService } from '../../services/posting.service';
import { Rankingpost1Directive } from '../../directives/rankingpost.directive';

@Component({
  selector: 'app-scheduler-week',
  templateUrl: './scheduler-week.component.html',
  styleUrls: ['./scheduler-week.component.css'],
  providers: [PostingService]
})
export class SchedulerWeekComponent implements OnInit {
  @ViewChild(Rankingpost1Directive)
  private rankingpost1Directive: Rankingpost1Directive;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private postingService: PostingService,
  ) { }

  ngOnInit() {
  }

}

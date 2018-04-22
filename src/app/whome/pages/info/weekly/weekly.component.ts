import { Component, OnInit, ViewChild } from '@angular/core';
import { Rankingpost1Directive, Rankingpost2Directive, Rankingpost3Directive } from '../../../directives/rankingpost.directive';
import { ContentsService } from '../../../../wmanagement/services/contents.service';
import { PostingService } from '../../../services/posting.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [ContentsService, PostingService]
})
export class WeeklyComponent implements OnInit {
  @ViewChild(Rankingpost1Directive)
  private rankingpostDirective1: Rankingpost1Directive;
  @ViewChild(Rankingpost2Directive)
  private rankingpostDirective2: Rankingpost2Directive;
  @ViewChild(Rankingpost3Directive)
  private rankingpostDirective3: Rankingpost3Directive;

  constructor(
    private contentsService: ContentsService,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.contentsService.getWeeklyList();
  }

}

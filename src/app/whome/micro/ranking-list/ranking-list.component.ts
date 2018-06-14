/**
 * @file horizontal-list.component.ts
 * @author
 * @brief a micro component for showing ranking contents vertically up to 3.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {
  @Input() toptitle = 'noname';
  @Input() more;
  @Input() records;
  today = new Date();
  date;
  dateStr;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    const date = new Date();
    this.setDate(date.getFullYear(), date.getMonth(), date.getDate());
  }

  onClickMore() {
    this.router.navigate(['info/weekly']);
  }

  getNextWeek() {
    if (this.getDayOfWeek(this.today, 0) < this.date) {
      this.alertService.warn('최신 주간입니다.');
      return;
      // this.setDate(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    }
    const date = this.date;
    this.setDate(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  }

  getLastWeek() {
    const date = this.date;
    this.setDate(date.getFullYear(), date.getMonth(), date.getDate() - 7);
  }

  setDate(year, month, date) {
    this.date = this.getDayOfWeek(new Date(year, month, date), 0);
    this.dateStr = this.date.toISOString().slice(0, 10);
  }

  getDayOfWeek(date, dayOfWeek) {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (dayOfWeek - date.getDay() - 1) % 7 + 1);
    return resultDate;
  }

}

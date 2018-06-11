import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {
  @Input() toptitle = 'noname';
  @Input() more;
  @Input() records;
  date = new Date();

  constructor(private router: Router) {
    console.log('next day: ', this.getNextDayOfWeek(this.date, 0));
  }

  ngOnInit() {
    // console.log('records form parent to ranking-list: ', this.records);
  }

  onClickMore() {
    this.router.navigate(['info/weekly']);
  }

  getNextDayOfWeek(date, dayOfWeek) {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay() - 1) % 7 + 1);
    return resultDate;
  }

}

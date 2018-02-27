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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickMore() {
    this.router.navigate(['info/weekly']);
  }

}

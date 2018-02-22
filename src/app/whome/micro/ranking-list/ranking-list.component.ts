import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  @Input() toptitle = 'noname';
  constructor() { }

  ngOnInit() {
  }

}

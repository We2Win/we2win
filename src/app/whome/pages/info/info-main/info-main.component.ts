import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info.service';
import { Data } from '../../../models/data';

@Component({
  selector: 'app-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.css'],
  providers: [InfoService]
})

export class InfoMainComponent implements OnInit {
  recentRecords: Object;
  weeklyRecords: Object;

  constructor(private infoService: InfoService) {
  }

  ngOnInit() {
    // this.infoService.getAll().subscribe(
    //   (data: Data) => { this.recentRecords = data.data; },
    //   error => { console.log('error: ', error); }
    // );
    // this.infoService.getAll().subscribe(
    //   (data: Data) => { this.weeklyRecords = data.data; },
    //   error => { console.log('error: ', error); }
    // );
  }

}

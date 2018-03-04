import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.css'],
  providers: [InfoService]
})
export class InfoMainComponent implements OnInit {
  private recentRecords;

  constructor(private infoService: InfoService) {
  }

  ngOnInit() {
    this.recentRecords = this.infoService.getAll();
    console.log(this.recentRecords);
  }

}

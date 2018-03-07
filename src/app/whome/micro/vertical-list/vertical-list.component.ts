import { Component, OnInit, OnChanges, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core/';
import { Info } from '../../models/info';
import { DataItem } from '../../models/data-item';
import { InfoService } from '../../services/info.service';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.css']
})
export class VerticalListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild(InfoCardComponent)
  private infoCardComponent: InfoCardComponent;

  _toptitle: String;

  @Input() toptitle = '무제';
  dataItems: DataItem[];
  intervalId: any;
  dataIndex = -1;
  @Input() records;
  interval: any;

  constructor(
    private _elementRef: ElementRef,
    private infoService: InfoService
  ) {
    this._toptitle = this.toptitle;
  }

  ngAfterViewInit() {
    // this.dataItems = this.infoService.getSample();
    // this.startCard();
  }

  startCard() {
    // // this.intervalId = setInterval(() => {
    // //   this.dataIndex = (this.dataIndex === this.dataItems.length)
    // //     ? 0 : this.dataIndex + 1;

    // //   this.infoService.loadComponent(
    // //     this.infoCardComponent.viewContainerRef, this.dataItems[this.dataIndex]);
    // // }, 2000);

    // // tslint:disable-next-line:forin
    // for (let i in this.dataItems) {
    //   this.infoService.createComponent(
    //     this.infoCardComponent.viewContainerRef, this.dataItems[i]);
    // }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('records at vertical-list: ', this.records);
  }

  ngOnDestroy() {
    // clearInterval(this.intervalId);
  }

}

import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: [
    './tracking.component.css',
    '../pages.css'
  ]
})
export class TrackingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // let canvas: any = document.getElementById('monthly');
    // const ctx = canvas.getContext('2d');

    // const dataMonthlyInfo = {
    //   datasets: [{
    //     data: [100, 22, 22, 22]
    //   }],

    //   labels: [
    //     '전체 컨텐츠 개수',
    //     '부동산 정보',
    //     '분양 현황',
    //     '구인 구직',
    //     '오프라인 모임'
    //   ]
    // };

    // canvas = document.getElementById('monthly');
    // const userActivityChart = new Chart(canvas, {
    //   type: 'bar',
    //   data: dataMonthlyInfo,
    //   // options: options
    // });

  }
}

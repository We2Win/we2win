import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../pages.css'
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let canvas: any = document.getElementById('memberInfo');
    const ctx = canvas.getContext('2d');

    const fillPlatinum = ctx.createLinearGradient(0, 100, 100, 0);
    fillPlatinum.addColorStop(0, 'rgba(213, 177, 94, 0.4)');
    fillPlatinum.addColorStop(1, 'rgba(213, 177, 94, 1)');
    const fillPremium = ctx.createLinearGradient(0, 100, 100, 0);
    fillPremium.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
    fillPremium.addColorStop(1, 'rgba(0, 0, 0, 1');
    const fillStandard = ctx.createLinearGradient(0, 100, 100, 0);
    fillStandard.addColorStop(0, 'rgba(170, 170, 170, 0.4)');
    fillStandard.addColorStop(1, 'rgba(170, 170, 170, 1)');

    const dataMemberInfo = {
      datasets: [{
        data: [54, 24, 22],
        backgroundColor: [ fillPlatinum , fillPremium, fillStandard ],
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'PLATINUM',
        'PREMIUM',
        'STANDARD'
      ]
    };

    const dataContentsInfo = {
      datasets: [{
        data: [100, 22, 22, 22]
      }],

      labels: [
        '전체 컨텐츠 개수',
        '부동산 정보',
        '분양 현황',
        '구인 구직',
        '오프라인 모임'
      ]
    };

    const memberInfoChart = new Chart(ctx, {
      type: 'pie',
      data: dataMemberInfo,
      // options: options
    });

    canvas = document.getElementById('contentsInfo');
    const contentsInfoChart = new Chart(canvas, {
      type: 'horizontalBar',
      data: dataContentsInfo,
      // options: options
    });

    canvas = document.getElementById('userActivity');
    const userActivityChart = new Chart(canvas, {
      type: 'horizontalBar',
      data: dataContentsInfo,
      // options: options
    });

  }

}

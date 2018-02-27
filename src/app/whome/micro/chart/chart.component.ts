import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() type: string;
  @Input() num: string;

  optionA: object = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: true,
        barThickness: 20,
        offset: true,
        gridLines: [{
          display: false,
        }],
      }],
    },
  };

  optionB: object = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: true,
        barThickness: 20,
        offset: true,
        ticks: {
          padding: 10,
        },
        // gridLines: [{
        //   display: true,
        //   lineWidth: 1,
        //   color: 'rgba(0, 0, 0, 0.25)',
        // }],
      }],
      yAxes: [{
        display: false,
        ticks: {
          suggestedMin: 5,
          suggestedMax: 15,
          callback: function(value, index, values) {
            return value + '억원';
          }
        },
      }],
    },
  };

  chartData: object = {
    infoDetail: [
      {
        type: 'bar',
        data: {
          datasets: [{
            data: [9, 9.4, 10, 11, 11.4],
          }],
          labels: ['40평형', '45평형', '50평형', '60평형', '70평형'],
        },
        options: this.optionB,
      },
      {
        type: 'bar',
        data: {
          datasets: [{
            data: [9, 9.4, 10, 11, 11.4],
          }],
          labels: ['40평형', '45평형', '50평형', '60평형', '70평형'],
        },
        options: this.optionB,
      }
    ],
    analysisContents: [
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['500  ', '1200  ', '300  ']
          }],
          labels: ['PLATINUM  ', 'PREMIUM  ', 'STANDARD  '],
        },
        options: this.optionA,
      },
    ]
  };


  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
    const canvas: any = this._elementRef.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const fillPlatinum = ctx.createLinearGradient(0, 150, 0, 0);
    fillPlatinum.addColorStop(0, 'rgba(213, 177, 94, 0)');
    fillPlatinum.addColorStop(1, 'rgba(213, 177, 94, 1)');
    const fillPremium = ctx.createLinearGradient(0, 150, 0, 0);
    fillPremium.addColorStop(0, 'rgba(0, 0, 0, 0)');
    fillPremium.addColorStop(1, 'rgba(0, 0, 0, 1');
    const fillStandard = ctx.createLinearGradient(0, 150, 0, 0);
    fillStandard.addColorStop(0, 'rgba(170, 170, 170, 0)');
    fillStandard.addColorStop(1, 'rgba(170, 170, 170, 1)');

    this.chartData['infoDetail'][0].data.datasets[0]['backgroundColor'] =
      [fillStandard, fillStandard, fillStandard, fillPremium, fillPlatinum];
    this.chartData['infoDetail'][1].data.datasets[0]['backgroundColor'] =
      [fillStandard, fillStandard, fillStandard, fillPremium, fillPlatinum];

    try {
      const chart = new Chart(canvas, this.chartData[this.type][this.num]);
    } catch {

    }
  }
}
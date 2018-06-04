import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chartObject;
  @Input() type: string;
  @Input() num: string;
  @Input() data;

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

  chartData: object = {
    dashboard: [
      {
        type: 'pie',
        data: {
          datasets: [{
            data: [0, 0, 0],
            // data: [54, 24, 22],
          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            'STANDARD',
            'PREMIUM',
            'PLATINUM',
          ]
        }
      },
      {
        type: 'pie',
        data: {
          datasets: [{
            // data: [100, 22, 22, 22, 5]
          }],

          labels: [
            '전체 컨텐츠 개수',
            '부동산 정보',
            '분양 현황',
            '구인 구직',
          ]
        }
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            // data: ['3000', '1000', '500  ', '1200  ', '300  ']
          }],
          labels: ['클릭  ', '댓글  ', 'SNS  ', '스크랩  '],
        },
        options: this.optionA,
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
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['12300', '500  ', '300  ', '500  ', '900']
          }],
          labels: ['5천만원 미만  ', '1억 미만  ', '3억 미만  ', '5억 미만  ', '5억 이상  '],
          borderWidth: 1,
        },
        options: this.optionA,
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['500  ', '1200  ', '300  ']
          }],

          labels: ['PLATINUM  ', 'PREMIUM  ', 'STANDARD  '],
        },
        options: this.optionA
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['12300', '500  ', '300  ', '500  ', '900']
          }],
          labels: ['5천만원 미만  ', '1억 미만  ', '3억 미만  ', '5억 미만  ', '5억 이상  '],
          barThickness: '5',
          borderWidth: 1,
        },
        options: this.optionA,
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['500  ', '1200  ', '300  ']
          }],

          labels: ['PLATINUM  ', 'PREMIUM  ', 'STANDARD  '],
          barThickness: '5',
          borderWidth: 1,
        },
        options: this.optionA
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['12300', '500  ', '300  ', '500  ', '900']
          }],
          labels: ['5천만원 미만  ', '1억 미만  ', '3억 미만  ', '5억 미만  ', '5억 이상  '],
          barThickness: '5',
          borderWidth: 1,
        },
        options: this.optionA,
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['500  ', '1200  ', '300  ']
          }],

          labels: ['PLATINUM  ', 'PREMIUM  ', 'STANDARD  '],
          barThickness: '5',
          borderWidth: 1,
        },
        options: this.optionA
      },
      {
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: ['12300', '500  ', '300  ', '500  ', '900']
          }],
          labels: ['5천만원 미만  ', '1억 미만  ', '3억 미만  ', '5억 미만  ', '5억 이상  '],
          barThickness: '5',
          borderWidth: 1,
        },
        options: this.optionA,
      },
    ],
    analysisUser: [
      {
        type: 'line',
        data: {
          datasets: [
            {
              data: ['3.20', '8.10', '7.10', '9.90'],
              backgroundColor: '#D4805D33',
            },
            {
              data: ['7.00', '3.20', '4.50', '3.00']
            },
            {
              data: ['1.00', '2.00', '1.20', '3.00']
            }
          ],
        },
        options: this.optionA,
      },
      {
        type: 'line',
        data: {
          datasets: [
            {
              data: ['3.20', '8.10', '7.10', '9.90'],
              backgroundColor: '#D4805D33',
            },
            {
              data: ['7.00', '3.20', '4.50', '3.00']
            },
            {
              data: ['1.00', '2.00', '1.20', '3.00']
            }
          ],
        },
        options: this.optionA,
      },
      {
        type: 'line',
        data: {
          datasets: [
            {
              data: ['3.20', '8.10', '7.10', '9.90'],
              backgroundColor: '#D4805D33',
            },
            {
              data: ['7.00', '3.20', '4.50', '3.00']
            },
            {
              data: ['1.00', '2.00', '1.20', '3.00']
            }
          ],
        },
        options: this.optionA,
      },
      {
        type: 'line',
        data: {
          datasets: [
            {
              data: ['3.20', '8.10', '7.10', '9.90'],
              backgroundColor: '#D4805D33',
            },
            {
              data: ['7.00', '3.20', '4.50', '3.00']
            },
            {
              data: ['1.00', '2.00', '1.20', '3.00']
            }
          ],
        },
        options: this.optionA,
      },
      {
        type: 'line',
        data: {
          datasets: [
            {
              data: ['3.20', '8.10', '7.10', '9.90'],
              backgroundColor: '#D4805D33',
            },
            {
              data: ['7.00', '3.20', '4.50', '3.00']
            },
            {
              data: ['1.00', '2.00', '1.20', '3.00']
            }
          ],
        },
        options: this.optionA,
      },
      {
        type: 'line',
        data: {
          datasets: [
            {
              data: ['3.20', '8.10', '7.10', '9.90'],
              backgroundColor: '#D4805D33',
            },
            {
              data: ['7.00', '3.20', '4.50', '3.00']
            },
            {
              data: ['1.00', '2.00', '1.20', '3.00']
            }
          ],
        },
        options: this.optionA,
      },
    ],
    tracking: [
      {
        type: 'bar',
        data: {
          datasets: [{
            data: [5, 6, 6.5, 5, 7, 8, 9, 7.5, 10, 8, 5, 5.5]
          }],

          labels: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
          barThickness: '5',
          borderWidth: 1,
        },

        options: this.optionA,
      }
    ]
  };


  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
    const canvas: any = this._elementRef.nativeElement.querySelector('canvas');
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

    this.chartData['dashboard'][0].data.datasets[0]['backgroundColor'] =
      [fillStandard, fillPremium, fillPlatinum];
    this.chartData['analysisContents'][0].data.datasets[0]['backgroundColor'] =
      [fillPlatinum, fillPremium, fillStandard];

    try {
      setTimeout(() => {
        console.log('chart data: ', this.data, this.chartData[this.type][this.num]);
        const dataArr = [];
        // tslint:disable-next-line:forin
        for (const i in this.data) {
          dataArr.push(this.data[i]);
        }
        this.chartData[this.type][this.num].data.datasets[0].data = dataArr;
        this.chartObject = new Chart(canvas, this.chartData[this.type][this.num]);
      }, 1500);
    } catch (e) {

    }
  }
}

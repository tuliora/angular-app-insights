import {Component, Input, OnInit} from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html'
})
export class ChartLineComponent implements OnInit {

  private _data: any;
  chart: any;

  constructor() { }

  ngOnInit(): void {}

  updateChart(obj: any): void {
    this.chart = new Chart(document.getElementById('chartLine'), {
      type: 'line',
      data: {
        labels: obj.labels,
        datasets: [
          {
            data: obj.data,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: obj.title
        }
      }
    });
  }

  get data(): any {
    return this._data;
  }

  @Input()
  set data(value: any) {
    setTimeout(() => {
      this._data = value;
      if (value != null)
        this.updateChart(value);
    });
  }
}

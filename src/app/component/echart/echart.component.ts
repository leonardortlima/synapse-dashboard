import { Component, OnInit, Input } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.scss']
})
export class EchartComponent implements OnInit {

  @Input()
  chart: RenderedChart;

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    }
  };

  mergeOption: EChartOption = {};

  constructor() { }

  ngOnInit() {
    this.mergeOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: this.chart.type,
        }
      ]
    };
  }

}

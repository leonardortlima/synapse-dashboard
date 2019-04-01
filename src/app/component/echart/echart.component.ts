import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.scss']
})
export class EchartComponent implements OnInit, OnChanges {

  @Input()
  chart: RenderedChart;

  chartOption: EChartOption = { };

  mergeOption: EChartOption = {};

  constructor() { }

  ngOnInit() {
    console.log('this chart', this.chart);
    this.mergeOption = this.chart.chartOption;
  }

  ngOnChanges() {
    console.log('this chart', this.chart);
  }

}

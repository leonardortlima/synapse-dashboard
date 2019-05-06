import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EChartOption } from 'echarts';
import { CHART_TRANSFORMERS } from 'src/app/domain/chart-transformer';

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.scss']
})
export class EchartComponent implements OnInit, OnChanges {

  @Input()
  chartData: Array<any>;

  @Input()
  chartType: string;

  chartOption: EChartOption = { };

  mergeOption: EChartOption = { };

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.mergeOption = CHART_TRANSFORMERS[this.chartType].generateChart(this.chartData);
  }

}

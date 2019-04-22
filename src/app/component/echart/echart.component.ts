import { Component, OnInit, Input, OnChanges } from '@angular/core';
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

  chartOption: EChartOption = { };

  mergeOption: EChartOption = {};

  constructor() { }

  ngOnInit() {
    this.mergeOption = this.chart.chartTransformer.generateChart(
      this.chart.values[this.chart.selectedIndex]
    );
  }

}

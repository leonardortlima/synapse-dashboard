import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';

@Component({
  selector: 'app-chart-holder',
  templateUrl: './chart-holder.component.html',
  styleUrls: ['./chart-holder.component.scss']
})
export class ChartHolderComponent implements OnInit, OnChanges {

  @Input()
  charts: Array<RenderedChart>;

  constructor() { }

  ngOnInit() {
  }

  columnSelected(index, renderedChart: RenderedChart, cIndex) {
    const chartTransformer = renderedChart.chartTransformer;
    renderedChart.selectedIndex = index;
    this.charts[cIndex] = JSON.parse(JSON.stringify(renderedChart));
    this.charts[cIndex].chartTransformer = chartTransformer;
  }

  ngOnChanges() {
    console.log(`changes`);
  }

}

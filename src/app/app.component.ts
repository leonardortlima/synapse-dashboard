import { Component, OnInit } from '@angular/core';
import { MenuItem } from './component/navbar/navbar.component';
import { ApiService } from './service/api.service';
import { EChartOption } from 'echarts';
import { LineChartTransformer, BarChartTransformer, PieChartTransformer } from './domain/chart-transformer';

export interface RenderedChart {
  type: string;
  chartOption: EChartOption;
}

@Component({
  selector: 'app-root',
  template: `
  <app-navbar (menuClick)="onMenuClick($event)">
    <app-chart-holder [charts]="charts">
    </app-chart-holder>
  </app-navbar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public charts: Array<RenderedChart> = [];
  public apiResponse;

  toggleMenu = true;

  public transformers = {
    line: new LineChartTransformer(),
    bar: new BarChartTransformer(),
    pie: new PieChartTransformer(),
  };

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.apiService.getSheetValues(
      '1_6Z7F0WUzEQS3QnT9rtUlHEziWe5DAHRrFpso-uEloY',
      'G1:G5',
    ).subscribe(
      response => {
        this.apiResponse = response;
      },
    );
  }

  onMenuClick(menuItem: MenuItem) {
    const transformer = this.transformers[menuItem.type];
    const transformedResponse = transformer.generateChart(this.apiResponse);
    this.charts.push(transformedResponse);
  }
}

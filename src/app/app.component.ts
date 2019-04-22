import { Component, OnInit, OnChanges } from '@angular/core';
import { MenuItem } from './component/navbar/navbar.component';
import { ApiService } from './service/api.service';
import { EChartOption } from 'echarts';
import { LineChartTransformer, BarChartTransformer, PieChartTransformer, ChartTransformer } from './domain/chart-transformer';
import { spread } from 'q';

export interface RenderedChart {
  colSize: number;
  menuOptions: Array<any>;
  values: Array<Array<any>>;
  selectedIndex: number;
  chartTransformer: ChartTransformer;
}

@Component({
  selector: 'app-root',
  template: `
  <app-navbar (menuClick)="onMenuClick($event)">
    <app-chart-holder [(charts)]="charts">
    </app-chart-holder>
  </app-navbar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  public charts: Array<RenderedChart> = [];
  public spreadsheetValues;

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
    this.apiService.getSpreadsheetValues('1_6Z7F0WUzEQS3QnT9rtUlHEziWe5DAHRrFpso-uEloY')
    .subscribe(
      spreadsheet => this.spreadsheetValues = spreadsheet.values,
    );
  }

  ngOnChanges() {
    console.log(`a changes`);
  }

  onMenuClick(menuItem: MenuItem) {
    const transformer = this.transformers[menuItem.type];
    const menuOptions = this.spreadsheetValues.map(col => col[0]);

    this.charts.push({
      colSize: 12,
      menuOptions,
      values: this.spreadsheetValues,
      selectedIndex: null,
      chartTransformer: transformer,
    });
  }
}

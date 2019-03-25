import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { from, timer, interval } from 'rxjs';
import { mergeMap, filter, map, toArray } from 'rxjs/operators';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar>
    <app-chart-holder>
    </app-chart-holder>
  </app-navbar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toggleMenu = true;

  public pageTitle = 'Pedidos';
  public sheetsResponse;

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    }
  };

  mergeOption: EChartOption = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    interval(1000).pipe(
      mergeMap(() => this.apiService.getSheetValues('1s2oRkL9cZh4SreVKVZWn7l-g5pXI8Km_eFvvkCGnzP8', 'A2:B5')),
      map(response => this.transform(response))
    ).subscribe(response => this.handleResponse(response));
  }

  private handleResponse(response) {
    const [countries, values] = response;
    this.mergeOption = {
      xAxis: {
        type: 'category',
        data: countries
      },
      series: [
        {
          data: values,
          type: 'line'
        }
      ]
    };
  }

  private transform(apiResponse) {
    return apiResponse.values.reduce(
      (acc, it) => {
        const [countries, values] = acc;
        countries.push(it[0]);
        values.push(it[1]);
        return acc;
      },
      [[], []]
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { from } from 'rxjs';
import { mergeMap, filter, map, toArray } from 'rxjs/operators';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pageTitle = 'Pedidos';
  public sheetsResponse;

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  };

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.apiService.getSheetValues(
      '1s2oRkL9cZh4SreVKVZWn7l-g5pXI8Km_eFvvkCGnzP8', 'A1:A9'
    ).subscribe(response => {
      console.log(`Response is`, response);
      this.sheetsResponse = response;
    });
  }

}

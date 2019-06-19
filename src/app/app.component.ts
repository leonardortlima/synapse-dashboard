import { Component, OnInit, OnChanges } from '@angular/core';
import { MenuItem } from './component/navbar/navbar.component';
import { SpreadSheetService, GoogleSpreadsheet } from './service/api.service';

export interface RenderedChart {
  type: string;
  colSize: number;
  data: Array<any>;
}

@Component({
  selector: 'app-root',
  template: `
  <app-navbar (menuClick)="onMenuClick($event)">
    <app-chart-list [charts]="charts">
    </app-chart-list>
  </app-navbar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public charts: Array<RenderedChart> = [];

  toggleMenu = true;

  constructor() { }

  ngOnInit() { }

  onMenuClick(menuItem: MenuItem) {
    this.charts.push({
      type: menuItem.type,
      colSize: 12,
      data: null,
    });
  }
}

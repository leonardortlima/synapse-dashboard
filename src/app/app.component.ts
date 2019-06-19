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

  public spreadsheet: GoogleSpreadsheet;
  public charts: Array<RenderedChart> = [];

  toggleMenu = true;

  constructor(
    private apiService: SpreadSheetService,
  ) { }

  ngOnInit() {
    this.apiService.getAllSpreadsheetValues()
      .subscribe(
        spreadsheet => this.spreadsheet = spreadsheet,
      );
  }

  onMenuClick(menuItem: MenuItem) {
    if (this.spreadsheet == null) {
      return;
    }

    this.charts.push({
      type: menuItem.type,
      colSize: 12,
      data: null,
    });
  }
}

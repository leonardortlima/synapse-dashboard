import { Component, OnInit } from '@angular/core';
import { MenuItem } from './component/navbar/navbar.component';

export interface RenderedChart {
  type: string;
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

  toggleMenu = true;

  constructor() {}

  ngOnInit() { }

  onMenuClick(menuItem: MenuItem) {
    this.charts.push(menuItem);
  }
}

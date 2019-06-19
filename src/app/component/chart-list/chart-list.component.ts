import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {

  @Input()
  charts: Array<RenderedChart>;

  constructor() { }

  ngOnInit() { }

}

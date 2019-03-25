import { Component, OnInit, Input } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';

@Component({
  selector: 'app-chart-holder',
  templateUrl: './chart-holder.component.html',
  styleUrls: ['./chart-holder.component.scss']
})
export class ChartHolderComponent implements OnInit {

  @Input()
  charts: Array<RenderedChart>;

  constructor() { }

  ngOnInit() {
  }

}

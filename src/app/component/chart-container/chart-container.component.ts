import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';
import { SpreadSheetService } from 'src/app/service/api.service';
import { CHART_TRANSFORMERS } from 'src/app/domain/chart-transformer';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  @Input()
  chart: RenderedChart;

  menuOptions: Array<any>;
  chartTypes: Array<any> = Object.keys(CHART_TRANSFORMERS);

  constructor(
    private spreadSheetService: SpreadSheetService,
  ) { }

  ngOnInit() {
    this.spreadSheetService.getAllSpreadsheetValues('1_6Z7F0WUzEQS3QnT9rtUlHEziWe5DAHRrFpso-uEloY')
      .subscribe(
        spreadsheet => {
          this.menuOptions = spreadsheet.columns;
          this.chart.data = spreadsheet.values[0];
        }
      );
  }

  columnSelected(index) {
    this.spreadSheetService.getAllSpreadsheetValues('1_6Z7F0WUzEQS3QnT9rtUlHEziWe5DAHRrFpso-uEloY')
      .subscribe(
        spreadsheet => this.chart.data = spreadsheet.values[index]
      );
  }

  plusChartSize() {
    if (this.chart.colSize === 12) {
      return;
    }

    this.chart.colSize += 1;
  }

  minosChartSize() {
    if (this.chart.colSize === 3) {
      return;
    }

    this.chart.colSize -= 1;
  }

  chartSelected(type) {
    this.chart.type = type;
  }
}

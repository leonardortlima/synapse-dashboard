import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RenderedChart } from 'src/app/app.component';
import { SpreadSheetService } from 'src/app/service/api.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  @Input()
  chart: RenderedChart;

  menuOptions: Array<any>;

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

}

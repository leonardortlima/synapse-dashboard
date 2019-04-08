import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getSpreadsheet(spreadsheetId): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}${spreadsheetId}`,
      { params: { key: '***REMOVED***' } }
    );
  }

  public getSpreadsheetValues(spreadsheetId): Observable<any> {
    return this.getSpreadsheet(spreadsheetId).pipe(
      mergeMap((spreadsheet: any) => {
        const range = spreadsheet.sheets[0].properties.title;
        return this.getSheetValues(spreadsheetId, range, 'COLUMNS');
      }),
    );
  }

  public getSheetValues(spreadsheetId, range, dimension = 'ROWS'): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}${spreadsheetId}/values/${range}`,
      { params:
        {
          key: '***REMOVED***',
          majorDimension: dimension,
        }
      }
    );
  }


}

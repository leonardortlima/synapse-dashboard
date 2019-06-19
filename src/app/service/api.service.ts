import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

interface LocalValuesCache {
  [sheetId: string]: CachedItem<GoogleSpreadsheet>;
}

interface LocalSpreadSheetCache {
  [sheetId: string]: CachedItem<any>;
}

interface CachedItem<T> {
  fetchDate: Date;
  value: T;
}

export interface GoogleSpreadsheet {
  id: string;
  columns: Array<any>;
  values: Array<Array<any>>;
}

@Injectable({
  providedIn: 'root'
})
export class SpreadSheetService {

  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

  private spreadsheetId: string;

  private lastFetch: 0;

  private spreadSheets: any;

  private spreadSheetValues: Array<any>;

  private localSpreadsheetCache: LocalSpreadSheetCache = {};

  private localValuesCache: LocalValuesCache = {};

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getSpreadsheet(): Observable<any> {
    const cachedSpreadsheet = this.localSpreadsheetCache[this.spreadsheetId];
    if (cachedSpreadsheet != null && this.isNewerThen2Minutes(cachedSpreadsheet.fetchDate)) {
      return cachedSpreadsheet.value;
    }

    return this.httpClient.get(
      `${this.baseUrl}${this.spreadsheetId}`,
      { params: { key: '***REMOVED***' } }
    ).pipe(
      tap(spreadsheet => {

        this.localSpreadsheetCache[this.spreadsheetId] = {
          fetchDate: new Date(),
          value: spreadsheet,
        };
      })
    );
  }

  public getAllSpreadsheetValues(): Observable<GoogleSpreadsheet> {
    const cachedValues = this.localValuesCache[this.spreadsheetId];
    if (cachedValues != null && this.isNewerThen2Minutes(cachedValues.fetchDate)) {
      return of(cachedValues.value);
    }

    return this.getSpreadsheet().pipe(
      mergeMap((spreadsheet: any) => {
        const range = spreadsheet.sheets[0].properties.title;
        return this.getSpreadsheetValues(this.spreadsheetId, range, 'COLUMNS');
      }),
      map(response => {
        const googleSpreadsheet = this.valuesResponseToGoogleSpreadsheet(this.spreadsheetId, response);
        this.localValuesCache[this.spreadsheetId] = {
          fetchDate: new Date(),
          value: googleSpreadsheet,
        };
        return googleSpreadsheet;
      }),
    );
  }

  public getSpreadsheetValues(spreadsheetId, range, dimension = 'ROWS'): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}${spreadsheetId}/values/${range}`,
      {
        params:
        {
          key: '***REMOVED***',
          majorDimension: dimension,
        }
      }
    );
  }

  public setSpreadsheetId(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;

    this.getAllSpreadsheetValues()
      .subscribe();
  }

  private valuesResponseToGoogleSpreadsheet(spreadsheetId, response): GoogleSpreadsheet {
    return {
      id: spreadsheetId,
      values: response.values,
      columns: response.values.map(value => value[0]),
    };
  }

  private isNewerThen2Minutes(date: Date): boolean {
    const difference = new Date().getTime() - date.getTime();
    return difference < 120000;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public pedidos(spreadsheetId, range): Observable<any> {
    return this.httpClient.get(`${spreadsheetId}/values/${range}`);
  }


}

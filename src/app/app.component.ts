import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { from } from 'rxjs';
import { mergeMap, filter, map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pageTitle = 'Pedidos';
  public sheetsResponse;

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.apiService.getSheetValues(
      '1s2oRkL9cZh4SreVKVZWn7l-g5pXI8Km_eFvvkCGnzP8', 'A1:A9'
    ).subscribe(response => {
      console.log(`Response is`, response);
      this.sheetsResponse = response;
    });
  }

}

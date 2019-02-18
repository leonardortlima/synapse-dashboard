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
  public pedidos;

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.apiService.pedidos().pipe(
      mergeMap(pedidos => from(pedidos)),
      filter((pedido: any) => pedido.total > 100),
      map((pedido: any) => pedido.produtos),
      toArray(),
    ).subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

}

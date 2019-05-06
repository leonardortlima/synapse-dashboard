import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ChartListComponent } from './component/chart-list/chart-list.component';
import { EchartComponent } from './component/echart/echart.component';
import { ChartContainerComponent } from './component/chart-container/chart-container.component';
import { TranslatePipe } from './domain/translate-pipe/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChartListComponent,
    ChartContainerComponent,
    EchartComponent,
    TranslatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgxEchartsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit, Output, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { timer, fromEvent } from 'rxjs';
import { SpreadSheetService } from 'src/app/service/api.service';
import { debounceTime } from 'rxjs/operators';

export interface MenuItem {
  name: string;
  type: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Output()
  menuClick: EventEmitter<MenuItem> = new EventEmitter();

  @ViewChild('idInput')
  idInput: ElementRef;

  chartId = '';

  toggleMenu = true;

  public menuItems: Array<MenuItem>;

  constructor(
    private spreadsheetService: SpreadSheetService,
  ) {
    this.menuItems = [
      { name: 'Linhas', type: 'line' },
      { name: 'Barras', type: 'bar' },
      { name: 'Pizza', type: 'pie' },
    ];
  }

  ngOnInit() {
    fromEvent<any>(this.idInput.nativeElement, 'keyup').pipe(
      debounceTime(750)
    ).subscribe(
      event => console.log('busque agora', event.target.value),
    );
  }

  ngOnChanges() {
    console.log(`something changed`, this.chartId);
  }

  onMenuClick(menuItem) {
    this.menuClick.emit(menuItem);
  }

  saveId() {
    this.spreadsheetService.setSpreadsheetId(this.chartId);
  }


}

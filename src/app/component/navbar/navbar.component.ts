import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface MenuItem {
  name: string;
  type: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output()
  menuClick: EventEmitter<MenuItem> = new EventEmitter();

  toggleMenu = true;

  public menuItems: Array<MenuItem>;

  constructor() {
    this.menuItems = [
      { name : 'Linhas', type: 'line' },
      { name: 'Barras', type: 'bar' },
      { name: 'Pizza', type: 'pie' },
    ];
  }

  ngOnInit() {
  }

  onMenuClick(menuItem) {
    this.menuClick.emit(menuItem);
  }

}

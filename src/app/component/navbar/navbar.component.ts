import { Component, OnInit } from '@angular/core';

export interface MenuItem {
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggleMenu = true;

  public menuItems: Array<MenuItem>;

  constructor() {
    this.menuItems = [
      { name : 'Linhas' },
      { name: 'Barras' },
      { name: 'Pizza' },
      { name: 'Bolinha' }
    ];
  }

  ngOnInit() {
  }

}

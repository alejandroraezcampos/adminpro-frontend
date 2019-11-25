import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];

  constructor() { }
  setMenu( menu: any ) {
    this.menu = menu;
  }
  getMenu() {
    return this.menu;
  }
}

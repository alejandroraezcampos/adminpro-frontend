import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: User;
  menu: any [] = [];

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.menu = this.sidebarService.getMenu();
  }

  logout() {
    this.userService.logout();
  }
}

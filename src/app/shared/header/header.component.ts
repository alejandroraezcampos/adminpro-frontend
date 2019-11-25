import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }
  search( value: string ) {
    if (value.length <= 0 ) {
      return;
    }
    this.router.navigate(['/search', value]);
  }

  logout() {
    this.userService.logout();
  }

}

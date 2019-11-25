import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate( ) {
    if ( this.userService.isAdmin()) {
      return true;
    } else {
      Swal.fire('Debe ser administrador');
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

}

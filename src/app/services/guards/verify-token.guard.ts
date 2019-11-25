import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  canActivate(): Promise<boolean> | boolean {
    let token = localStorage.getItem('token');
    let payload = JSON.parse(atob( token.split('.')[1]));
    let expirate = this.expirates(payload.exp);

    if (expirate) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verifyRenew( payload.exp);
  }

  expirates( dateExpiration: number ) {
    const now  = new Date().getTime() / 1000;
    if ( dateExpiration < now ) {
      return true;
    } else {
      return false;
    }
  }

  verifyRenew( dateExpiration: number ): Promise<boolean> {
    return new Promise( ( resolve, reject) => {
      const tokenExp = new Date( dateExpiration * 1000 );
      const now = new Date();
      now.setTime( now.getTime() + ( 4 + 60 * 60 * 1000));
      if ( tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this.userService.renewToken()
                          .subscribe( () => {
                            resolve(true);
                          }, () => {
                            this.router.navigate(['/login']);
                            reject(false);
                          });
      }
      resolve(true);
    });
  }
}

import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map , catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { SidebarService } from '../shared/sidebar.service';
import { Observable } from 'rxjs';
import { UploadFileService } from '../uploadFile/uploadFile.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private uploadFileService: UploadFileService,
    private sidebarService: SidebarService
  ) {
    this.readStorage();
   }

  saveStorage(id: string, token: string, user: User, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.readStorage();
  }

  readStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.sidebarService.setMenu( JSON.parse(localStorage.getItem('menu')));
    } else {
      this.token = '';
      this.user = null;
      this.sidebarService.setMenu(null);
    }
  }

  isLoggued() {
    return ( this.token.length > 5) ? true : false;
  }

  getRole() {
    return this.user.role;
  }

  isAdmin() {
    return this.user.role === 'ADMIN_ROLE' ? true : false;
  }

  getUser() {
    return this.user;
  }

  createUser( user: User ) {
    const url = URL_SERVICES + '/users';
    return this.http.post(url, user ).pipe(
      map( (resp: any) => {
        Swal.fire('Usuario creado', resp.user.email, 'success');
        return resp.user;
      })
    );
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post(url, { token })
    .pipe(
      map( (resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
        return true;
      })
    );
  }

  login( user: User, remember: boolean = false ) {
    if ( remember ) {
      localStorage.setItem('email', user.email );
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICES + '/login';
    return this.http.post(url, user)
    .pipe(
      map( (resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
        return true;
      })
    );
  }

  renewToken() {
    let url = URL_SERVICES + '/login/renewtoken';
    url += '?token=' + localStorage.getItem('token');
    return this.http.get( url )
          .pipe(map( (resp: any) => {
            localStorage.setItem('token', resp.token);
            return true;
          }),
          catchError( err => {
            this.router.navigate(['/login']);
            Swal.fire('No se pudo renovar token', 'No fue posible renovar el token', 'success');
            return Observable.throw(err);
          })
          );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.token = '';
    this.user = null;
    this.sidebarService.setMenu(null);
    this.router.navigate(['/login']);
  }

  updateUser(user: User) {
    let url = URL_SERVICES + '/users/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user)
            .pipe(
              map( (resp: any) => {
                if (user._id === this.user._id ) {
                  this.saveStorage( resp.user._id, this.token, resp.user, this.sidebarService.getMenu());
                }
                Swal.fire('Usuario actualizado', user.name, 'success');
                return true;
              })
            );
  }

  changeImage( file: File, id: string ) {
    this.uploadFileService.uploadFile(file, 'user', id)
          .then( (resp: any) => {
            this.user.img = resp.user.img;
            Swal.fire({title: 'Imagen Actualizada', type: 'success'});
            this.saveStorage(this.user._id, this.token, this.user, this.sidebarService.getMenu());
          })
          .catch ( (resp:any) => {
          });
  }

  getUsers( from: number = 0 ) {
    let url = URL_SERVICES + '/users?from=' + from;
    return this.http.get( url );
  }

  searchUsers( term: string, from: number = 0 ) {
    let url = URL_SERVICES + '/search/collection/users/' + term + '?from=' + from;
    return this.http.get( url )
          .pipe( map( (resp: any) => resp.users ));
  }

  deleteUser(id : string  ) {
    let url = URL_SERVICES + '/users/' + id + '?token=' + this.token;
    return this.http.delete( url )
          .pipe(map((resp: any) => Swal.fire('Usuario Borrado', '', 'success')));
  }
}

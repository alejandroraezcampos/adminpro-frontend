import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService,
        ModalUploadService
 } from 'src/app/services/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  from: number = 0;
  totalUsers: number = 0;
  waiting: boolean = true;
  search: boolean = false;
  allUsers: boolean = false;
  term: string = '';

  constructor(
    public userService: UserService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.modalUploadService.notification
            .subscribe( 
              resp => { this.getUsers()}
            );
  }

  getUsers() {
    this.allUsers = true;
    this.waiting = true;
    this.userService.getUsers( this.from )
        .subscribe( (resp: any) => {
          this.totalUsers = resp.found;
          this.users = resp.users;
          this.waiting = false;
        });

  }

  changeFrom( value: number ) {
    if ( this.search ) {
      let from = this.from + value;

      if ( from >= this.totalUsers ) {
        return;
      }
      if ( from < 0 ) {
        return;
      }
      this.from += value;
      this.searchUser(this.term);
    }

    if ( !this.search ) {
      let from = this.from + value;
      if ( from >= this.totalUsers ) {
        return;
      }
      if ( from < 0 ) {
        return;
      }
      this.from += value;
      this.getUsers();
    }
  }

  searchUser( term: string ) {
    if (! this.search ) {
      this.from = 0;
    }
    this.search = true;
    this.term = term;
    if (term.length <= 0 ) {
      this.search = false;
      this.from = 0;
      this.term = null;
      this.getUsers();
      return;
    }

    this.waiting = true;
    this.userService.searchUsers( this.term, this.from )
                        .subscribe( (data: any) => {
                          this.users = data.users;
                          this.totalUsers = data.found;
                          this.waiting = false;
                        });
  }
  deleteUser( user: User ) {
    if ( user._id === this.userService.user._id ) {
      Swal.fire({title: 'No puede borrar el usuario', text: 'No se puede borrar a si mismo', type: 'error'});
      return;
    }
    Swal.fire({
      title: '¿Está seguro que desea borrar el usuario?',
      text: 'Esta a punto de borrar a ' + user.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( ( result ) => {
      if ( result.value ) {
        this.userService.deleteUser( user._id )
                    .subscribe( (resp: any) => { this.from = 0; this.getUsers(); });
      }
    });
  }

  saveUser( user: User ) {
    this.userService.updateUser(user)
                    .subscribe();
  }

  showModal( id: string ) {
    this.modalUploadService.showModal('user', id);
  }
}

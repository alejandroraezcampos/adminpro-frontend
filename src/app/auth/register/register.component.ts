import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  areSamePassword( field1: string, field2: string ) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        areSamePassword: true
      };
    };
  }

  buildForm() {
    this.formRegister = this.fb.group({
      name: [{value: null, disabled: false}, Validators.required],
      email: [{value: null, disabled: false}, [Validators.required, Validators.email]],
      password1: [{value: null, disabled: false}, Validators.required],
      password2: [{value: null, disabled: false}, Validators.required],
      terms: [{value: false, disabled: false}]
    }, { validators: this.areSamePassword('password1', 'password2')});
  }

  singUpUser() {
     if ( this.formRegister.invalid ) {
       return;
     }

     if ( !this.formRegister.value.terms ) {
       Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
       return;
     }
     let user = new User(
        this.formRegister.value.name,
        this.formRegister.value.email,
        this.formRegister.value.password1
     );
     this.userService.createUser(user).subscribe ( resp => this.router.navigate(['/login']));
  }

}

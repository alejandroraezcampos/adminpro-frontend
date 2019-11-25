import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/service.index';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  auth2: any;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.BuildForm();
    this.rememberMe();
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '901421055026-rup5b2kfrs3h8o4uj9uarsonicgh4qgf.apps.googleusercontent.com',
        cookiepoliciy: 'single-host-origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }
  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.zone.run( () => {
        this.userService.loginGoogle(token).subscribe( resp => this.router.navigate(['/dashboard']));
      });
    });
  }
  BuildForm() {
    this.loginForm = this.fb.group({
      email: [{value: null, disabled: false}],
      password: [{value: null, disabled: false}],
      remember: [{value: false, disabled: false}]
    });
  }

  login() {
    if ( this.loginForm.invalid ) {
      return;
    }
    let user = new User(null, this.loginForm.value.email, this.loginForm.value.password);
    this.userService.login(user, this.loginForm.value.remember).subscribe( resp => this.router.navigate(['/dashboard']));
  }

  rememberMe() {
    this.email = localStorage.getItem('email') || '';
    this.loginForm.patchValue({email: this.email});
    if ( this.email.length > 1) {
      this.loginForm.patchValue({remember: true});
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService,
        UploadFileService } from 'src/app/services/service.index';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  imageUpload: File;
  imageTmp: any;
  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    public uploadFileService: UploadFileService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.buildForm();
    this.profileForm.patchValue({name: this.user.name, email: this.user.email});
    if (this.user.google ) {
       this.profileForm.get('email').disable();
    }
  }

  buildForm() {
    this.profileForm = this.fb.group({
      name: [{value: null, disabled: false}],
      email: [{value: null, disabled: false}]
    });
  }

  save( user: User ) {
    this.user.name = user.name;
    if (! this.user.google ) {
      this.user.email = user.email;
    }
    this.userService.updateUser(this.user)
        .subscribe();
  }

  selectImage( file: File ) {
    if ( !file ) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0 ) {
      Swal.fire({ title: 'Solo imagenes', type: 'error'});
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;
    let reader = new FileReader();
    let urlImageTmp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTmp = reader.result;
  }

  changeImage( ) {
    this.userService.changeImage( this.imageUpload, this.user._id);
  }
}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService, ModalUploadService } from 'src/app/services/service.index';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  hidden: string = 'hidden';
  imageUpload: File;
  imageTmp: any;

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
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
    let urlImagenTmp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTmp = reader.result;
  }

  uploadImage() {
    this.uploadFileService.uploadFile( this.imageUpload, this.modalUploadService.type, this.modalUploadService.id )
                  .then( resp => {
                    this.modalUploadService.notification.emit( resp );
                    this.closeModal();
                    Swal.fire({title: '¡Imagen actualizada correctamente!', type: 'success'});
                  })
                  .catch( err => {console.log('Error en la carga'); });
  }

  closeModal() {
    this.imageTmp = null;
    this.imageUpload = null;
    this.modalUploadService.hideModal();
  }

}

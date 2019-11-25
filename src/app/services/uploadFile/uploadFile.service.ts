import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: string) {
    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('image', file, file.name );
      xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4) {
          if (xhr.status === 200 ) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(JSON.parse(xhr.response));
          }
        }
      };

      let url = URL_SERVICES + '/upload' ;
      switch (type) {
        case 'user':
        url += '/users/' + id;
        break;
        case 'doctor':
        url += '/doctors/' + id;
        break;
        case 'hospital':
        url += '/hospitals/' + id;
        break;
      }

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}

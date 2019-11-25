import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

  getDoctors( from: number ) {
    const url = URL_SERVICES + '/doctors?from=' + from;
    return this.http.get( url );
  }

  getDoctorById( id: string ) {
    const url = URL_SERVICES + '/doctors/' + id;
    return this.http.get( url )
            .pipe(map( (resp: any) => resp.doctor ));
  }

  searchDoctor( term: string, from: number = 0 ) {
    const url = URL_SERVICES + '/search/collection/doctors/' + term + '?from=' + from;
    return this.http.get( url )
                .pipe(map( (resp: any) =>  resp.doctors ));
  }

  deleteDoctor( id: string ) {
    let url = URL_SERVICES + '/doctors/' + id;
    url += '?token=' +  localStorage.getItem('token');
    return this.http.delete( url )
            .pipe(map( () => Swal.fire('Medico borrado correctamente', '', 'success')));
  }
  saveDoctor( doctor: Doctor, method: string ) {
    let url = URL_SERVICES + '/doctors';
    if ( method === 'new') {
      url += '?token=' +  localStorage.getItem('token');
      return this.http.post( url, doctor )
        .pipe(map((resp: any) => {
          Swal.fire('Medico creado', resp.doctor.name, 'success');
          return resp.doctor;
        }));
    }
    if ( method === 'update') {
      url += '/' + doctor._id;
      url += '?token=' +  localStorage.getItem('token');
      return this.http.put( url, doctor )
        .pipe(map((resp: any) => {
          Swal.fire('Medico Actualizado', resp.doctor.name, 'success');
          return resp.doctor;
        }));
    }
  }
}

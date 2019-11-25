import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  getHospitals( from: number) {
    let url = URL_SERVICES + '/hospitals?from=' + from ;
    return this.http.get( url );
  }

  getHospitalById(id: string ) {
    let url = URL_SERVICES + '/hospitals/' + id;
    return this.http.get( url )
                    .pipe(map( (resp: any) => resp.hospital));
  }
  deleteHospital(id: string) {
    let token = localStorage.getItem('token');
    let url = URL_SERVICES + '/hospitals/' + id + '?token=' + token;
    return this.http.delete(url)
        .pipe( map( (resp) => {Swal.fire('Hospital borrado correctamente', '', 'success'); return true; }));
  }
  newHospital(name: string ) {
    let url = URL_SERVICES + '/hospitals?token=' + localStorage.getItem('token');
    return this.http.post( url, { name });
  }
  updateHospital(hospital: Hospital ) {
    let token = localStorage.getItem('token');
    let url = URL_SERVICES + '/hospitals/' + hospital._id + '?token=' + token;
    return this.http.put(url, hospital)
                    .pipe(map( (resp: any) => {Swal.fire('Hospital Actualizado', '', 'success'); return true; }));
  }
  searchHospital(term: string, from: number = 0 ) {
    let url = URL_SERVICES + '/search/collection/hospitals/' + term + '?from=' + from;
    return this.http.get(url)
               .pipe(map( (resp: any) => resp.hospitals));
  }
}

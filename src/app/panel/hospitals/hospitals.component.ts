import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService,
        ModalUploadService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  waiting: boolean = true;
  search: boolean = false;
  totalHospitals: number;
  hospitals: Hospital[];
  from: number = 0;
  term: string;

  constructor(
    private hospitalService: HospitalService,
    private modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getHospitals();
    this.modalUploadService.notification.subscribe( resp => this.getHospitals());
  }
  getHospitals() {
    this.search = false;
    this.waiting = true;
    this.hospitalService.getHospitals( this.from )
        .subscribe( (resp: any) => {
          this.totalHospitals = resp.found;
          this.hospitals = resp.hospitals;
          this.waiting = false;
        });
  }
  searchHospital( value: string ) {
    if ( !this.search ) {
      this.from = 0;
    }
    this.search = true;
    this.term = value;
    if ( value.length <= 0) {
      this.search = false;
      this.from = 0;
      this.term = null;
      this.getHospitals();
      return;
    }
    this.waiting = true;
    this.hospitalService.searchHospital(this.term, this.from)
                        .subscribe( (resp: any) => {
                          this.hospitals = resp.hospitals;
                          this.totalHospitals = resp.found;
                          this.waiting = false;
                        });
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital)
                        .subscribe( () => this.getHospitals());
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Está seguro que desea borrar el hospital?',
      text: 'Esta a punto de borrar (' + hospital.name + ')',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {
      this.hospitalService.deleteHospital(hospital._id)
                        .subscribe(resp => this.getHospitals());
    });
  }

  newHospital() {
    Swal.fire({
      title: 'Ingresa el nombre del hospital',
      input: 'text',
      showCancelButton: true
    }).then( (value: any ) => {
      if ( !value.value || value.value.length === 0 ) {
         return;
      }
      this.hospitalService.newHospital(value.value)
          .subscribe( () => {
            Swal.fire({title: 'Nuevo Hospital creado', type: 'success'});
            this.getHospitals();
          });
    }).catch();
  }

  changeFrom( value: number ) {
    if ( this.search ) {
      let from = this.from + value;
      if ( from >= this.totalHospitals ) { return; }
      if ( from < 0 ) { return; }
      this.from += value;
      this.searchHospital(this.term);
    }
    if ( !this.search ) {
      let from = this.from + value;
      if ( from >= this.totalHospitals ) { return; }
      if ( from < 0 ) { return; }
      this.from += value;
      console.log(this.from);
      this.getHospitals();
    }
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospital', id);
  }

}

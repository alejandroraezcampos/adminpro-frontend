import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})

export class DoctorsComponent implements OnInit {
  waiting: boolean = false;
  search: boolean = false;
  totalDoctors: number;
  doctors: Doctor[];
  from: number = 0;
  term: string;
  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }
  getDoctors() {
    this.search = false;
    this.waiting = true;
    this.doctorService.getDoctors( this.from )
                        .subscribe( (data: any) => {
                          this.doctors = data.doctors;
                          this.totalDoctors = data.found;
                          this.waiting = false;
                        });
  }

  searchDoctor( value: string ) {
    if ( !this.search ) {
      this.from = 0;
    }
    this.search = true;
    this.term = value;
    if ( value.length <= 0) {
      this.search = false;
      this.from = 0;
      this.term = null;
      this.getDoctors();
      return;
    }
    this.waiting = true;
    this.doctorService.searchDoctor(this.term, this.from)
                        .subscribe( (resp: any) => {
                          this.doctors = resp.doctors;
                          this.totalDoctors = resp.found;
                          this.waiting = false;
                        });
  }

  deleteDoctor( doctor: Doctor ) {
    Swal.fire({
      title: '¿Está seguro que desea borrar el médico?',
      text: 'Esta a punto de borrar (' + doctor.name + ')',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {
      this.doctorService.deleteDoctor(doctor._id)
                        .subscribe(resp => this.getDoctors());
    });
  }

  changeFrom( value: number ) {
    if ( this.search ) {
      let from = this.from + value;
      if ( from >= this.totalDoctors ) { return; }
      if ( from < 0 ) { return; }
      this.from += value;
      this.searchDoctor(this.term);
    }
    if ( !this.search ) {
      let from = this.from + value;
      if ( from >= this.totalDoctors ) { return; }
      if ( from < 0 ) { return; }
      this.from += value;
      this.getDoctors();
    }
  }
  showModal(id: string) {}
}

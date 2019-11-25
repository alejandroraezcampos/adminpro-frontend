import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService,
         HospitalService,
         DoctorService } from 'src/app/services/service.index';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  doctorForm: FormGroup;
  doctor: Doctor;
  hospital: Hospital;
  hospitals: Hospital[] = [];
  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalUploadService
    ) {
    this.buildForm();
    this.route.params.subscribe( (params: any) => {
      let id = params['id'];

      if (id !== 'new') {
        this.getDoctor(id);
      } else {
        this.doctorForm.patchValue({hospital: ''});
      }
    });
  }

  buildForm() {
    this.doctorForm = this.fb.group({
      name: [{ value: null, disabled: false }],
      hospital: [{ value: null, disabled: false }]
    });
  }

  getDoctor( id: string ) {
    this.doctorService.getDoctorById( id )
                      .subscribe( (resp: any) => {
                        this.doctorForm.patchValue({name: resp.name, hospital: resp.hospital._id });
                        this.doctor = resp;
                        this.hospital = resp.hospital;
                      });
  }

  ngOnInit() {
    this.hospitalService.getHospitals(0)
    .subscribe( (resp: any) => {
      this.hospitals = resp.hospitals;
    });
    this.modalService.notification.subscribe( resp => {
      this.doctor.img = resp.doctor.img;
    });
  }

  saveDoctor( form: FormGroup) {
    const method = this.doctor ? 'update' : 'new';
    if ( method === 'update') {
      this.doctor.name = form.get('name').value;
      this.doctor.hospital = form.get('hospital').value;
      this.doctorService.saveDoctor(this.doctor, method )
                      .subscribe( (doctor: Doctor) => {
                        this.doctor = doctor;
                        this.router.navigate(['/doctor', doctor._id ]);
                      });

    } else {
      this.doctorService.saveDoctor(form.value, method )
                      .subscribe( (doctor: Doctor) => {
                        this.doctor = doctor;
                        this.router.navigate(['/doctor', doctor._id ]);
                      });
    }

  }
  changeHospital( id: string ) {
    this.hospitalService.getHospitalById(id)
                        .subscribe( (hospital: Hospital ) => this.hospital = hospital);
  }
  changeImage() {
    this.modalService.showModal('doctor', this.doctor._id);
  }
}

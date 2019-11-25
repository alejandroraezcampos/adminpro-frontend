import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService,
          SidebarService,
          ModalUploadService,
          UploadFileService,
          UserService,
          DoctorService,
          HospitalService,
          AdminGuard,
          VerifyTokenGuard,
          SearchService,
          LoginGuard } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    LoginGuard,
    AdminGuard,
    VerifyTokenGuard,
    UploadFileService,
    ModalUploadService,
    UserService,
    DoctorService,
    HospitalService,
    SearchService
  ]
})
export class ServiceModule { }

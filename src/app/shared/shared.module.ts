import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import {
  BreadcrumbsComponent,
  GraphicComponent,
  HeaderComponent,
  IncreaserComponent,
  ModalUploadComponent,
  NopagefoundComponent,
  SidebarComponent,
} from './shared.index';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
  GraphicComponent,
  HeaderComponent,
  IncreaserComponent,
  ModalUploadComponent,
  NopagefoundComponent,
  SidebarComponent,
  ],
  exports: [
    BreadcrumbsComponent,
  GraphicComponent,
  HeaderComponent,
  IncreaserComponent,
  ModalUploadComponent,
  NopagefoundComponent,
  SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class SharedModule { }

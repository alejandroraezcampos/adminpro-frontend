import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/guards/admin.guard';

const routes: Routes = [
      { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
      { path: 'graphics', component: GraphicsComponent, data: {title: 'Graficas'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'MyAccountSettings'}},
      { path: 'profile', component: ProfileComponent, data: {title: 'Perfil del usuario'}},
      { path: 'users' , canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Mantenimiento de Usuarios'}},
      { path: 'hospitals', canActivate: [AdminGuard], component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales'}},
      { path: 'doctors', canActivate: [AdminGuard], component: DoctorsComponent, data: { title: 'Mantenimiento de Medicos'}},
      { path: 'doctor/:id', canActivate: [AdminGuard] , component: DoctorComponent, data: { title: 'Editar / Crear Usuario'}},
      { path: 'search/:term', component: SearchComponent, data: { title: 'Buscar'}},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PanelRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PanelComponent } from './panel/panel.component';
import { LoginGuard } from './services/guards/login.guard';
import { VerifyTokenGuard } from './services/guards/verify-token.guard';


const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [LoginGuard, VerifyTokenGuard],
    loadChildren: './panel/panel.module#PanelModule'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

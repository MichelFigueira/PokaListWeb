import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from '../../pages/user/login/login.component';
import { RegisterComponent } from '../../pages/user/register/register.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthLayoutModule { }

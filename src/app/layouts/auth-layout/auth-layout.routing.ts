import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/user/login/login.component';
import { RegisterComponent } from '../../pages/user/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];

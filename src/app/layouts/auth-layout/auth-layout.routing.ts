import { Routes } from '@angular/router';

import { LoginComponent } from '@app/pages/user/login/login.component';
import { RegisterComponent } from '@app/pages/user/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];

import { Routes } from '@angular/router';
import { LoginPage } from './module/login/page/login-page';
import { RegisterPage } from './module/register/page/register-page';

export const routes: Routes = [
  {
    component: LoginPage,
    path: 'login',
    title: 'Login',
  },
  {
    component: RegisterPage,
    path: 'register',
    title: 'Registro',
  },
];

import { Routes } from '@angular/router';
import { LoginPage } from './module/login/page/login-page';

export const routes: Routes = [
    {
        component: LoginPage,
        path: 'login',
        title: 'Login'
    }
];

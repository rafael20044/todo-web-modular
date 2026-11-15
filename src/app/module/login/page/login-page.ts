import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginForm, LoginHeader, LoginHero } from '../components';

@Component({
  imports: [LoginHero, LoginHeader, LoginForm],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}

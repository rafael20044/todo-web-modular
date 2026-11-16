import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterForm, RegisterHeader, RegisterHero } from '../components';

@Component({
  imports: [RegisterHero, RegisterHeader, RegisterForm],
  selector: 'app-register-page',
  styleUrl: './register-page.css',
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {}

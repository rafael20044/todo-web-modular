import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UiBrandLogo } from '../../../../shared/components';

@Component({
  imports: [UiBrandLogo],
  selector: 'app-login-header',
  templateUrl: './login-header.html',
  styleUrl: './login-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHeader {
  readonly title = input<string>('Bienvenido de nuevo');
  readonly subtitle = input<string>(
    'Ingresa tus credenciales para acceder a tu espacio de tareas.',
  );
}

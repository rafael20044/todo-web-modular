import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UiBrandLogo } from '../../../../shared/components';

@Component({
  imports: [UiBrandLogo],
  selector: 'app-register-header',
  templateUrl: './register-header.html',
  styleUrl: './register-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterHeader {
  readonly title = input<string>('Crea tu cuenta');
  readonly subtitle = input<string>(
    'Comienza a organizar tus tareas, categorías y subtareas en segundos.',
  );
}

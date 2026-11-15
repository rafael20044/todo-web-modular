import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { UiButton, UiCard, UiInput } from '../../../../shared/components';

@Component({
  imports: [UiCard, UiInput, UiButton],
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  readonly submitted = output<void>();

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.emit();
  }
}

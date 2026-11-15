import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiButton, UiCard, UiInput } from '../../../../shared/components';

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

@Component({
  imports: [ReactiveFormsModule, UiCard, UiInput, UiButton],
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly submitted = output<LoginCredentials>();

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.getRawValue());
    this.submitted.emit(this.form.getRawValue());
  }
}

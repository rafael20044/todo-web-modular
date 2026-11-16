import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UiButton, UiCard, UiInput } from '../../../../shared/components';
import { IUserRegister } from '../../../../shared/model/user/IUserRegister';

@Component({
  imports: [ReactiveFormsModule, RouterLink, UiCard, UiInput, UiButton],
  selector: 'app-register-form',
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const userRegister = {
      username: this.form.value.username || '',
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    } satisfies IUserRegister;
  }
}

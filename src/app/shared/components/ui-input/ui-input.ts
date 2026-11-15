import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'number';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInput implements ControlValueAccessor, OnInit {
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  readonly id = input.required<string>();
  readonly label = input<string>('');
  readonly type = input<InputType>('text');
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('off');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly minlength = input<number | null>(null);
  readonly maxlength = input<number | null>(null);
  readonly hasLeadingIcon = input<boolean>(false);
  readonly hint = input<string>('');
  readonly error = input<string>('');

  readonly value = model<string>('');

  protected readonly showPassword = signal<boolean>(false);
  protected readonly cvaDisabled = signal<boolean>(false);
  protected readonly controlError = signal<string>('');

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly displayError = computed(() => this.error() || this.controlError());

  protected readonly resolvedType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const control = this.ngControl?.control;
    if (control) {
      control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.syncControlError();
      });
    }
  }

  writeValue(value: string | null | undefined): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((prev) => !prev);
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChangeFn(target.value);
    this.syncControlError();
  }

  protected onBlur(): void {
    this.onTouchedFn();
    this.syncControlError();
  }

  private syncControlError(): void {
    const control = this.ngControl?.control;
    if (!control || !control.invalid || !(control.touched || control.dirty)) {
      this.controlError.set('');
      return;
    }

    const errors = control.errors;
    if (!errors) {
      this.controlError.set('');
      return;
    }

    if (errors['required']) {
      this.controlError.set('Este campo es obligatorio.');
    } else if (errors['email'] || errors['pattern']) {
      this.controlError.set('Ingresa un formato válido.');
    } else if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      this.controlError.set(`Debe tener al menos ${requiredLength} caracteres.`);
    } else if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      this.controlError.set(`No puede superar los ${requiredLength} caracteres.`);
    } else {
      this.controlError.set('Valor inválido.');
    }
  }
}

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

@Component({
  selector: 'app-ui-textarea',
  templateUrl: './ui-textarea.html',
  styleUrl: './ui-textarea.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextarea implements ControlValueAccessor, OnInit {
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  readonly id = input.required<string>();
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly rows = input<number>(4);
  readonly maxlength = input<number>(2000);
  readonly showCount = input<boolean>(true);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly hint = input<string>('');
  readonly error = input<string>('');

  readonly value = model<string>('');

  protected readonly cvaDisabled = signal<boolean>(false);
  protected readonly controlError = signal<string>('');

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly displayError = computed(() => this.error() || this.controlError());
  protected readonly charCount = computed(() => this.value().length);

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

  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
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
    } else if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      this.controlError.set(`No puede superar los ${requiredLength} caracteres.`);
    } else {
      this.controlError.set('Valor inválido.');
    }
  }
}

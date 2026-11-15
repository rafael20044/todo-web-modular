import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-ui-checkbox',
  templateUrl: './ui-checkbox.html',
  styleUrl: './ui-checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckbox implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly id = input.required<string>();
  readonly label = input<string>('');
  readonly description = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly strikethroughOnCheck = input<boolean>(false);

  readonly checked = model<boolean>(false);

  protected readonly cvaDisabled = signal<boolean>(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  private onChangeFn: (value: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: boolean | null | undefined): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  protected onToggle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.onChangeFn(target.checked);
    this.onTouchedFn();
  }
}

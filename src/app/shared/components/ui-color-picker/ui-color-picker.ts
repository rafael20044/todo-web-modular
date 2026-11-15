import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-ui-color-picker',
  templateUrl: './ui-color-picker.html',
  styleUrl: './ui-color-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiColorPicker implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly id = input.required<string>();
  readonly label = input<string>('Color de categoría');
  readonly presets = input<readonly string[]>([
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#06B6D4',
  ]);

  readonly value = model<string>('#3B82F6');

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | null | undefined): void {
    this.value.set((value || '#3B82F6').toUpperCase());
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  protected selectPreset(hex: string): void {
    const normalized = hex.toUpperCase();
    this.value.set(normalized);
    this.onChangeFn(normalized);
    this.onTouchedFn();
  }

  protected onColorInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const normalized = target.value.toUpperCase();
    this.value.set(normalized);
    this.onChangeFn(normalized);
    this.onTouchedFn();
  }
}

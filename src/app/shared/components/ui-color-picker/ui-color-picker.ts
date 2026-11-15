import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'app-ui-color-picker',
  templateUrl: './ui-color-picker.html',
  styleUrl: './ui-color-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiColorPicker {
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

  protected selectPreset(hex: string): void {
    this.value.set(hex.toUpperCase());
  }

  protected onColorInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value.toUpperCase());
  }
}

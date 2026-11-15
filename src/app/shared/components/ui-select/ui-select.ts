import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-ui-select',
  templateUrl: './ui-select.html',
  styleUrl: './ui-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelect {
  readonly id = input.required<string>();
  readonly label = input<string>('');
  readonly placeholder = input<string>('Seleccionar...');
  readonly options = input<readonly SelectOption[]>([]);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');

  readonly value = model<string>('');

  protected onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
  }
}

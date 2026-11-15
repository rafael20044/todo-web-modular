import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'app-ui-checkbox',
  templateUrl: './ui-checkbox.html',
  styleUrl: './ui-checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckbox {
  readonly id = input.required<string>();
  readonly label = input<string>('');
  readonly description = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly strikethroughOnCheck = input<boolean>(false);

  readonly checked = model<boolean>(false);

  protected onToggle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
  }
}

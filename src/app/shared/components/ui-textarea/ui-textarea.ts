import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-ui-textarea',
  templateUrl: './ui-textarea.html',
  styleUrl: './ui-textarea.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextarea {
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

  protected readonly charCount = computed(() => this.value().length);

  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
  }
}

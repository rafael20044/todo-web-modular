import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';

export type InputType = 'text' | 'email' | 'password' | 'search' | 'date' | 'datetime-local' | 'number';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInput {
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

  protected readonly resolvedType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  protected togglePasswordVisibility(): void {
    this.showPassword.update((prev) => !prev);
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-ui-alert',
  templateUrl: './ui-alert.html',
  styleUrl: './ui-alert.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAlert {
  readonly variant = input<AlertVariant>('info');
  readonly title = input<string>('');
  readonly dismissible = input<boolean>(false);

  readonly dismissed = output<void>();
}

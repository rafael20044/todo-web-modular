import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.html',
  styleUrl: './ui-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiModal {
  readonly open = input<boolean>(false);
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly size = input<ModalSize>('md');
  readonly hasFooter = input<boolean>(true);

  readonly closed = output<void>();
}

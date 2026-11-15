import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-ui-badge',
  templateUrl: './ui-badge.html',
  styleUrl: './ui-badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadge {
  readonly variant = input<BadgeVariant>('slate');
  readonly size = input<BadgeSize>('md');
  readonly dot = input<boolean>(false);
}

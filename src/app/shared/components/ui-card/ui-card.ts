import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCard {
  readonly padding = input<CardPadding>('md');
  readonly hoverable = input<boolean>(false);
  readonly hasHeader = input<boolean>(false);
  readonly hasFooter = input<boolean>(false);
}

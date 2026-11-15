import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BrandLogoSize = 'sm' | 'md' | 'lg';
export type BrandLogoTheme = 'auto' | 'light';

@Component({
  selector: 'app-ui-brand-logo',
  templateUrl: './ui-brand-logo.html',
  styleUrl: './ui-brand-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBrandLogo {
  readonly appName = input<string>('TodoWeb');
  readonly size = input<BrandLogoSize>('md');
  readonly theme = input<BrandLogoTheme>('auto');
}

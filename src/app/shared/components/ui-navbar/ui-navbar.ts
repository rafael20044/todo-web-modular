import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-ui-navbar',
  templateUrl: './ui-navbar.html',
  styleUrl: './ui-navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNavbar {
  readonly appName = input<string>('TodoWeb');
  readonly userName = input<string>('');
  readonly userEmail = input<string>('');

  readonly logoutClicked = output<void>();
}

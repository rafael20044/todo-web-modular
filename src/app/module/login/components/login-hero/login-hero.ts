import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiBadge, UiBrandLogo } from '../../../../shared/components';

@Component({
  imports: [UiBadge, UiBrandLogo],
  selector: 'app-login-hero',
  templateUrl: './login-hero.html',
  styleUrl: './login-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHero {}

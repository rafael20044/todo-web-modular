import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiBadge, UiBrandLogo } from '../../../../shared/components';

@Component({
  imports: [UiBadge, UiBrandLogo],
  selector: 'app-register-hero',
  templateUrl: './register-hero.html',
  styleUrl: './register-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterHero {}

import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { BrandingWidget } from '../widgets/branding-widget';
import { NotificationWidget } from '../widgets/notification-widget';
import { UserWidget } from '../widgets/user-widget';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    BrandingWidget,
    NotificationWidget,
    UserWidget,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    class: 'app-header'
  },
  encapsulation: ViewEncapsulation.None
})
export class Header {
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
}

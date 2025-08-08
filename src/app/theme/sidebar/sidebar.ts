import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { BrandingWidget } from '../widgets/branding-widget';
import { MenuPanel } from './menu-panel/menu-panel';
import { UserPanel } from './user-panel/user-panel';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSlideToggleModule,
    BrandingWidget,
    UserPanel,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MenuPanel,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Sidebar {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();
  @Output() sidenavClose = new EventEmitter();

  constructor() {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}

import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AsyncPipe, NgTemplateOutlet, SlicePipe } from '@angular/common';

import { NavAccordion } from './accordion/nav-accordion';
import { NavAccordionItem } from './accordion/nav-accordion-item';
import { NavAccordionToggle } from './accordion/nav-accordion-toggle';

import { MenuService } from '@core';

@Component({
  selector: 'app-menu-panel',
  imports: [
    AsyncPipe,
    SlicePipe,
    MatIconModule,
    MatRippleModule,
    NavAccordion,
    NavAccordionItem,
    NavAccordionToggle,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu-panel.html',
  styleUrls: ['./menu-panel.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ]
})
export class MenuPanel {
  @Input() ripple = false;

  private readonly menu = inject(MenuService);

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;
}

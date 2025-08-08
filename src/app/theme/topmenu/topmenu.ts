import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { filter, Subscription } from 'rxjs';

import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { MenuService } from '@core';
import { Menu } from '@shared';

import { TopmenuPanel } from './panel/topmenu-panel';

export interface TopmenuState {
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-topmenu',
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    TopmenuPanel
  ],
  templateUrl: './topmenu.html',
  styleUrl: './topmenu.scss',
  host: {
    class: 'app-topmenu',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topmenu {
  private readonly menu = inject(MenuService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  menuList: Menu[] = [];
  menuStates: TopmenuState[] = [];

  private readonly menuSubscription = Subscription.EMPTY;
  private routerSubscription = Subscription.EMPTY;

  constructor() {
    this.menuSubscription = this.menu$.subscribe(res => {
      this.menuList = res;
      this.menuList.forEach(item => {
        this.menuStates.push({
          active: this.router.url.split('/').includes(item.route),
          route: item.route,
        });
      });
    });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
      });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routerSubscription.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
        setTimeout(() => {
          this.menuStates[index].active = rla.isActive;
          this.cdr.markForCheck();
        });
      });
  }
}

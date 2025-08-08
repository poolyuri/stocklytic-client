import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { TopmenuState } from '../topmenu';

import { MenuService } from '@core';
import { MenuChildren } from '@shared';

@Component({
  selector: 'app-topmenu-panel',
  templateUrl: './topmenu-panel.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatMenuModule
  ],
})
export class TopmenuPanel implements OnInit, OnDestroy {
  private readonly menu = inject(MenuService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild(MatMenu, { static: true }) menuPanel!: MatMenu;

  @Input() items: MenuChildren[] = [];
  @Input() parentRoute: string[] = [];
  @Input() level = 1;
  @Output() routeChange = new EventEmitter<RouterLinkActive>();

  menuStates: TopmenuState[] = [];

  buildRoute = this.menu.buildRoute;

  private routerSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.items.forEach(item => {
      this.menuStates.push({ active: this.checkRoute(item), route: item.route });
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  checkRoute(item: MenuChildren) {
    if (!item.route) {
      return this.checkChildRoute(item.children);
    } else {
      return this.router.url.split('/').includes(item.route);
    }
  }

  checkChildRoute(menuItems: MenuChildren[] = []) {
    return menuItems.some(child => {
      if (this.router.url.split('/').includes(child.route)) {
        return true;
      }
      if (!child.route && child.children) {
        this.checkChildRoute(child.children);
      }
      return false;
    });
  }

  onRouterLinkClick(rla: RouterLinkActive) {
    this.routeChange.emit(rla);
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routeChange.emit(rla);

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

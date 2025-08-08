import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';

import { MenuService } from '@core';

@Component({
  selector: 'app-breadcrumb',
  imports: [MatIconModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  encapsulation: ViewEncapsulation.None
})
export class Breadcrumb {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);

  @Input() nav: string[] = [];

  navItems: string[] = [];

  trackByNavItem(index: number, item: string) {
    return item;
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe(() => {
        this.genBreadcrumb();
      });
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    if (this.nav.length > 0) {
      this.navItems = [...this.nav];
    } else {
      this.navItems = this.menu.getLevel(routes);
      this.navItems.unshift('inicio');
    }
  }
}

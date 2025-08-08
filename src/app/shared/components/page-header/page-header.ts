import { booleanAttribute, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuService } from '@core';

import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-page-header',
  imports: [Breadcrumb],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-page-header',
  }
})
export class PageHeader {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);

  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input({ transform: booleanAttribute }) hideBreadcrumb = false;

  ngOnInit() {
    const routes = this.router.url.slice(1).split('/');
    const menuLevel = this.menu.getLevel(routes);

    this.title = this.title || menuLevel[menuLevel.length - 1];
  }
}

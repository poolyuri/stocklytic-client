import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { filter, Subscription } from 'rxjs';

import { SettingsService } from '@core';
import { routeAnimations } from '@shared';

import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Topmenu } from '../topmenu/topmenu';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  imports: [
    Header,
    MatProgressBarModule,
    MatSidenavModule,
    MatSidenavContainer,
    NgProgressbar,
    NgProgressRouter,
    RouterOutlet,
    Sidebar,
    Topmenu,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.app-content-width-fix]': 'contentWidthFix',
    '[class.app-sidenav-collapsed-fix]': 'collapsedWidthFix',
  },
  animations: [routeAnimations]
})
export class AdminLayout implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);

  options = this.settings.options;

  public loading: boolean = false;
  private isMobileScreen: boolean = false;

  private isContentWidthFixed = true;

  get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private isCollapsedWidthFixed = false;
  get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }

  activeThemeCssClass: string = '';
  private layoutChangesSubscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.initializePage();
  }

  ngOnDestroy(): void {
    this.layoutChangesSubscription.unsubscribe();
  }

  initializePage(): void {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // Use setTimeout with 0 delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.options.sidenavOpened = true;

          this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
          this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
          this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
        }, 0);
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      if (this.isOver) {
        this.sidenav.close();
      }
      this.content.scrollTo({ top: 0 });
    });
  }

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => {
      this.settings.setOptions(this.options);
    }, timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }
}

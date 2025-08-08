import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SettingsService, TokenService } from '@core';
import { ImagePipe } from '@shared';
import { User } from '@features/administration/users/models/user.model';
import { selectProfile } from '@features/profile/general/state/profile.selector';

@Component({
  selector: 'app-user-widget',
  imports: [
    AsyncPipe,
    ImagePipe,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <button matIconButton
      [matMenuTriggerFor]="menu"
    >
      @if (user) {
        <img class="avatar" [src]="user.nameImage | image: 'users' | async"  width="24" />
      } @else {
        <img class="avatar" [src]="'assets/images/default.jpg'" width="24" />
      }
    </button>
    <mat-menu #menu="matMenu">
      <button routerLink="/profile/general" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Perfil</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Configuración</span>
      </button>
      <button mat-menu-item (click)="restore()">
        <mat-icon>restore</mat-icon>
        <span>Restaurar</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>Salir</span>
      </button>
    </mat-menu>
  `,
  styles: `
    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50rem;
    }
  `
})
export class UserWidget implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly tokenService = inject(TokenService);
  private readonly settings = inject(SettingsService);
  public user: User | null = null;
  private user$?: Subscription;

  ngOnInit(): void { 
    this.user$ = this.store.select(selectProfile)
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this.user$?.unsubscribe();
  }

  public logout(): void {
    setTimeout(() => {
      this.tokenService.clear();
      this.router.navigateByUrl('/auth/login');
    }, 1000);
  }

  restore() {
    this.settings.reset();
    window.location.reload();
  }
}

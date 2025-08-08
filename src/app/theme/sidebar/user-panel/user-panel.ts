import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TokenService } from '@core';
import { ImagePipe } from '@shared';
import { User } from '@features/administration/users/models/user.model';
import { selectProfile } from '@features/profile/general/state/profile.selector';

@Component({
  selector: 'app-user-panel',
  imports: [
    AsyncPipe,
    ImagePipe,
    RouterLink,
    MatButtonModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './user-panel.html',
  styleUrls: ['./user-panel.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPanel {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  public user: User | null = null;
  public hasError = false;

  constructor() {
    this.loadUserData();
  }

  private loadUserData(): void {
    const token = this.tokenService.get();
    const guidUser = token?.guidUser;

    if (!guidUser) {
      this.hasError = true;
      return;
    }

    this.store.select(selectProfile)
      .subscribe((profile) => {
        if (profile) {
          this.user = profile;
          this.hasError = false;
        } else {
          this.hasError = true;
        }
      });
  }

  public logout(): void {
    setTimeout(() => {
      this.tokenService.clear();
      this.router.navigateByUrl('/auth/login');
    }, 1000);
  }
}

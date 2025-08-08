import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MenuRoleService } from '@shared';
import { loadProfile } from '@features/profile/general/state/profile.actions';

import { TokenService } from '../auth/services/token.service';
import { MenuService } from './menu.service';
import { Menu } from '../../shared/models/menu.model';
import { ReduxService } from './redux.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private readonly store = inject(Store);
  private readonly menuRoleService = inject(MenuRoleService);
  private readonly menuService = inject(MenuService);
  private readonly reduxService = inject(ReduxService);
  private readonly tokenService = inject(TokenService);

  public load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const token = this.tokenService.get();
      const isValid = this.tokenService.isValid();
      
      if (isValid) {
        this.store.dispatch(loadProfile({ guid: token.guidUser }));
        this.menuRoleService
          .getMenuByUser(token.idCompany, token.idUser)
          .pipe(tap((menu) => this.startup(menu.listEntity)))
          .subscribe({
            next: () => resolve(),
            error: () => resolve(),
          });
      } else {
        resolve()
      }
    });
  }

  private startup(menu: Menu[]) {
    this.menuService.set(menu);
    this.reduxService.set(menu);
  }
}

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Menu, NotificationService } from '@shared';
import { 
  loadGroupers, 
  loadUsers, isCreatedUserDone, isUpdatedUserDone, isDeletedUserDone } from '@features';
import { isUpdatedProfileDone } from '@features/profile/general/state/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class ReduxService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  public set(menu: Menu[]): void {
    menu.forEach((menu: Menu) => {
      if (menu.script) {
        const fn = (this as any)[menu.script];
        if (typeof fn === 'function') {
          fn.call(this);
        }
      }
    });
  }

  private dispatchAdministration(): void {
    // users
    this.store.dispatch(loadUsers());
    //this.store.select(isCreatedUserDone).subscribe(({ done, message }) => {
    //  this.actionSuccess(done, message!);
    //});
    //this.store.select(isUpdatedUserDone).subscribe(({ done, message }) => {
    //  this.actionSuccess(done, message!);
    //});
    //this.store.select(isDeletedUserDone).subscribe(({ done, message }) => {
    //  this.actionSuccess(done, message!);
    //});

    this.store.select(isUpdatedProfileDone).subscribe(({ done, message }) => {
      this.actionSuccess(done, message!);
    });
  }

  private dispatchConfigurations(): void {
    this.store.dispatch(loadGroupers());
  }

  private dispatchProfile(): void { }

  private dispatchMaintenance(): void { }

  private dispatchWarehouse(): void { }

  private dispatchTreasury(): void { }

  private dispatchCloseout(): void { }

  private actionSuccess(done: boolean, message: string, redirect: string | null = '') {
    if (done) {
      this.notificationService.success(message);

      if (redirect) {
        this.router.navigateByUrl(redirect);
      }
    }
  }
}
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import * as UserActions from './user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getAll().pipe(
          map(({ listEntity }) => UserActions.loadUsersSuccess({ users: listEntity }))
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      mergeMap(action =>
        this.userService.getById(action.guidUser).pipe(
          map(({ entity }) => UserActions.loadUserByIdSuccess({ user: entity }))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(action =>
        this.userService.create(action.user).pipe(
          map(response => UserActions.createUserSuccess(response))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.userService.update(action.user).pipe(
          map(response => UserActions.updateUserSuccess({ response }))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.delete(action.user).pipe(
          map(response => UserActions.deleteUserSuccess(response))
        )
      )
    )
  );
}
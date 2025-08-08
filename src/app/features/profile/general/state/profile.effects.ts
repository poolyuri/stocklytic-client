import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { UserService } from '@features/administration/users/services/user.service';

import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  private readonly actions$ = inject(Actions);
  private readonly profileService = inject(UserService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      mergeMap(({ guid }) =>
        this.profileService.getById(guid).pipe(
          map(({ entity }) => ProfileActions.loadProfileSuccess({ profile: entity }))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      mergeMap(({ profile }) =>
        this.profileService.update(profile).pipe(
          map((response) => ProfileActions.updateProfileSuccess({ response, profile }))
        )
      )
    )
  );

  uploadImageProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.uploadImageProfile),
      map(nameImage => ProfileActions.uploadImageProfileSuccess(nameImage))
    )
  );
}

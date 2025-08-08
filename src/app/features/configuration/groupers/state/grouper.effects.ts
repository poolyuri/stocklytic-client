import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import * as GrouperActions from './grouper.actions';
import { GrouperService } from '../services/grouper.service';

@Injectable()
export class GrouperEffects {
  private readonly actions$ = inject(Actions);
  private readonly grouperService = inject(GrouperService);

  loadGroupers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GrouperActions.loadGroupers),
      mergeMap(() =>
        this.grouperService.getAll().pipe(
          map(({ listEntity }) => GrouperActions.loadGroupersSuccess({ groupers: listEntity }))
        )
      )
    )
  );  
}

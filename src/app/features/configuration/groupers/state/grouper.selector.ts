import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GrouperState } from './grouper.state';

export const selectGrouperState = createFeatureSelector<GrouperState>('groupers');

export const selectAllGroupers = createSelector(
  selectGrouperState,
  (state: GrouperState) => state.groupers
);

import { createReducer, on } from '@ngrx/store';

import { initialState } from './grouper.state';
import * as GrouperActions from './grouper.actions';

export const grouperReducer = createReducer(
  initialState,
  on(GrouperActions.loadGroupers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(GrouperActions.loadGroupersSuccess, (state, { groupers }) => ({
    ...state,
    groupers,
    loading: false
  }))
);

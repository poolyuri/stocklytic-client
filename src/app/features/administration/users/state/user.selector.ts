import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUserById = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const isCreatedUserDone = createSelector(
  selectUserState,
  (state: UserState) => {
    return { done: state.done, message: state.message };
  }
);

export const isUpdatedUserDone = createSelector(
  selectUserState,
  (state: UserState) => {
    return { done: state.done, message: state.message };
  }
);

export const isDeletedUserDone = createSelector(
  selectUserState,
  (state: UserState) => {
    return { done: state.done, message: state.message };
  }
);
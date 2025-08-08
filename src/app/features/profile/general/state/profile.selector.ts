import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProfileState } from './profile.state';
import { types } from './profile.actions';

export const selectProfileState = createFeatureSelector<ProfileState>('profiles');

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.profile
);

export const isUpdatedProfileDone = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    const isUpdateAction = state.action === types.UPDATE_PROFILE_SUCCESS;
    return { 
      done: state.done && isUpdateAction, 
      message: isUpdateAction ? state.message : null 
    };
  }
);

import { createReducer, on } from '@ngrx/store';

import { initialState } from './profile.state';
import * as ProfileActions from './profile.actions';
import { types } from './profile.actions';

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.loadProfile, (state) => ({
    ...state,
    done: false,
    action: types.LOAD_PROFILE
  })),
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    done: true,
    action: types.LOAD_PROFILE_SUCCESS,
  })),
  on(ProfileActions.updateProfile, (state) => ({
    ...state,
    done: false,
    message: null,
    action: types.UPDATE_PROFILE
  })),
  on(ProfileActions.updateProfileSuccess, (state, { response, profile }) => ({
    ...state,
    profile: {
      ...profile,
      fullName: `${profile.nameUser} ${profile.lastName}`
    },
    done: true,
    message: response.message,
    action: types.UPDATE_PROFILE_SUCCESS
  })),
  on(ProfileActions.uploadImageProfile, (state) => ({
    ...state,
    done: false,
    message: null,
    action: types.UPLOAD_IMAGE_PROFILE
  })),
  on(ProfileActions.uploadImageProfileSuccess, (state, { nameImage }) => ({
    ...state,
    profile: {
      ...state.profile!,
      nameImage,
      fullName: `${state.profile!.nameUser} ${state.profile!.lastName}`
    },
    done: true,
    message: '',
    action: types.UPLOAD_IMAGE_PROFILE_SUCCESS
  }))
);
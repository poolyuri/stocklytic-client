import { createAction, props } from '@ngrx/store';

import { ResponseData } from '@core';
import { User } from '@features/administration/users/models/user.model';

export enum types {
  LOAD_PROFILE = '[Profile] Load Profile',
  LOAD_PROFILE_SUCCESS = '[Profile] Load Profile Success',
  UPDATE_PROFILE = '[Profile] Update Profile',
  UPDATE_PROFILE_SUCCESS = '[Profile] Update Profile Success',
  UPLOAD_IMAGE_PROFILE = '[Profile] Upload Image Profile',
  UPLOAD_IMAGE_PROFILE_SUCCESS = '[Profile] Upload Image Profile Success'
}

/****************************************
 * GET User by id
 ****************************************/
export const loadProfile = createAction(
  types.LOAD_PROFILE,
  props<{ guid: string }>()
);

export const loadProfileSuccess = createAction(
  types.LOAD_PROFILE_SUCCESS,
  props<{ profile: User }>()
);

/****************************************
 * UPDATE User
 ****************************************/
export const updateProfile = createAction(
  types.UPDATE_PROFILE,
  props<{ profile: User }>()
);

export const updateProfileSuccess = createAction(
  types.UPDATE_PROFILE_SUCCESS,
  props<{ response: ResponseData, profile: User }>()
);

/****************************************
 * PATCH User
 ****************************************/
export const uploadImageProfile = createAction(
  types.UPLOAD_IMAGE_PROFILE,
  props<{ nameImage: string }>()
);

export const uploadImageProfileSuccess = createAction(
  types.UPLOAD_IMAGE_PROFILE_SUCCESS,
  props<{ nameImage: string }>()
);

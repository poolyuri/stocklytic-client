import { createAction, props } from '@ngrx/store';

import { ResponseData } from '@core';

import { IUser, User } from '../models/user.model';

/****************************************
 * GET all Users
 ****************************************/
export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

/****************************************
 * GET User by id
 ****************************************/
export const loadUserById = createAction(
  '[User] Load User By Id',
  props<{ guidUser: string }>()
);

export const loadUserByIdSuccess = createAction(
  '[User] Load User By Id Success',
  props<{ user: User }>()
);

/****************************************
 * CREATE User
 ****************************************/
export const createUser = createAction(
  '[User] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ response: ResponseData }>()
);

/****************************************
 * UPDATE User
 ****************************************/
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ response: ResponseData }>()
);

/****************************************
 * DELETE User
 ****************************************/
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ user: IUser }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ response: ResponseData }>()
);

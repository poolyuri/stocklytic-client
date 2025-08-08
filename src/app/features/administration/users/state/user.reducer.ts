import { createReducer, on } from '@ngrx/store';

import { initialState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    done: false
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    done: true
  })),
  on(UserActions.loadUserById, (state) => ({
    ...state,
    done: false
  })),
  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    user,
    done: true
  })),
  on(UserActions.createUser, (state) => ({
    ...state,
    done: false,
    message: null
  })),
  on(UserActions.createUserSuccess, (state, { response }) => {
    return ({
      ...state,
      user: {
        ...state.user!,
        idUser: response.id,
        guidUser: response.guid,
        fullName: `${state.user!.nameUser} ${state.user!.lastName}`
      },
      done: true,
      message: response.message
    })
  }),
  on(UserActions.updateUser, (state) => ({
    ...state,
    done: false,
    message: null
  })),
  on(UserActions.updateUserSuccess, (state, { response }) => ({
    ...state,
    user: {
      ...state.user!,
      fullName: `${state.user!.nameUser} ${state.user!.lastName}`
    },
    done: true,
    message: response.message
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    done: false,
    message: null
  })),
  on(UserActions.deleteUserSuccess, (state, { response }) => ({
    ...state,
    users: state.users.filter(user => user.idUser !== response.id),
    done: true,
    message: response.message
  }))
);
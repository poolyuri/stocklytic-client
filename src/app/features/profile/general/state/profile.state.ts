import { User } from "@features/administration/users/models/user.model"

export interface ProfileState {
  profile: User | null,
  done: boolean,
  message: string | null,
  action: string | null
}

export const initialState: ProfileState = {
  profile: null,
  done: false,
  message: null,
  action: null
}

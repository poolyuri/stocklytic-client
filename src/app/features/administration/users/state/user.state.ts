import { User } from "../models/user.model";

export interface UserState {
  users: User[],
  user: User | null,
  done: boolean,
  message: string | null
}

export const initialState: UserState = {
  users: [],
  user: null,
  done: false,
  message: null
}
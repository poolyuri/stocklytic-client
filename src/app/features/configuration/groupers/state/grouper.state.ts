import { Grouper } from "../models/grouper.model"

export interface GrouperState {
  groupers: Grouper[],
  loading: boolean,
  error: string | null
}

export const initialState: GrouperState = {
  groupers: [],
  loading: false,
  error: null
}
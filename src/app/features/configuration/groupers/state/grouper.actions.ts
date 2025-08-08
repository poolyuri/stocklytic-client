import { createAction, props } from '@ngrx/store';
import { Grouper } from '../models/grouper.model';

export const loadGroupers = createAction(
  '[Grouper] Load Groupers'
);

export const loadGroupersSuccess = createAction(
  '[Grouper] Load Groupers Success',
  props<{ groupers: Grouper[] }>()
);

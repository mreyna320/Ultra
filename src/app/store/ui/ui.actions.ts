import { createAction, props } from '@ngrx/store';

const SET_ERROR = '[UI] Set loading';
const SET_LOADING = '[UI] Set error';

export const SetError = createAction(
  SET_ERROR,
  props<{ error: string | null }>()
);

export const SetLoading = createAction(
  SET_LOADING,
  props<{ loading: boolean }>()
);

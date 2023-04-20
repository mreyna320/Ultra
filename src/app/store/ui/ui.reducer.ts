import { createReducer, on } from '@ngrx/store';

import * as uiActions from './ui.actions';

export interface State {
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  loading: false,
  error: null,
};

export const uiReducer = createReducer(
  initialState,
  on(uiActions.SetError, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(uiActions.SetLoading, (state, action) => {
    return {
      ...state,
      loading: action.loading,
    };
  })
);

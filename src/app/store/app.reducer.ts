import { ActionReducerMap } from '@ngrx/store';

import * as fromMarketplace from './marketplace/marketplace.reducer';

export interface AppState {
  marketplace: fromMarketplace.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  marketplace: fromMarketplace.marketplaceReducer,
};

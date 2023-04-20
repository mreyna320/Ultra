import { ActionReducerMap } from '@ngrx/store';

import * as fromMarketplace from './marketplace/marketplace.reducer';
import * as fromUi from './ui/ui.reducer';
import * as fromBasket from './basket/basket.reducer';

export interface AppState {
  marketplace: fromMarketplace.State;
  basket: fromBasket.State;
  ui: fromUi.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  marketplace: fromMarketplace.marketplaceReducer,
  basket: fromBasket.basketReducer,
  ui: fromUi.uiReducer,
};

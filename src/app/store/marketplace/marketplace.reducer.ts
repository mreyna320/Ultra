import { createReducer, on } from '@ngrx/store';

import { Product } from '../../models/product.model';
import * as MarketplaceActions from './marketplace.actions';

export interface State {
  mustFetchProducts: boolean;
  products: Product[];
  boughtProdIds: number[];
}

const initialState: State = {
  mustFetchProducts: true,
  products: [],
  boughtProdIds: [],
};

export const marketplaceReducer = createReducer(
  initialState,
  on(MarketplaceActions.ProductsFetchSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      boughtProdIds: action.boughtProdIds,
      mustFetchProducts: false,
    };
  }),
  on(MarketplaceActions.SetBoughtProductsIds, (state, action) => {
    const updatedProdIds = [
      ...state.boughtProdIds,
      ...action.products.map((x) => x.id),
    ];

    return {
      ...state,
      boughtProdIds: updatedProdIds,
    };
  })
);

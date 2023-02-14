import { createReducer, on } from '@ngrx/store';

import { Product } from '../../models/product.model';
import * as MarketplaceActions from './marketplace.actions';

export interface State {
  mustFetchProducts: boolean;
  products: Product[];
  basket: Product[];
  boughtProducts: Product[];
  loading: boolean;
  wallet: number;
}

const initialState: State = {
  mustFetchProducts: true,
  products: [],
  basket: [],
  boughtProducts: [],
  loading: false,
  wallet: 100,
};

export const marketplaceReducer = createReducer(
  initialState,
  on(MarketplaceActions.ProductsFetchStart, (state, action) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(MarketplaceActions.ProductsFetchSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      products: action.products,
      mustFetchProducts: false,
    };
  }),
  on(MarketplaceActions.ProductsFetchFail, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(MarketplaceActions.AddProduct, (state, action) => {
    const updatedBasket = [...state.basket, { ...action.product }];
    const inBasketIds = updatedBasket.map((x) => x.id);
    const updatedProducts = state.products.map((x) => ({
      ...x,
      inBasket: inBasketIds.includes(x.id),
    }));

    return {
      ...state,
      basket: updatedBasket,
      products: updatedProducts,
    };
  }),
  on(MarketplaceActions.RemoveProduct, (state, action) => {
    const updatedBasket = state.basket.filter(
      (x) => x.id !== action.product.id
    );
    const inBasketIds = updatedBasket.map((x) => x.id);
    const updatedProducts = state.products.map((x) => ({
      ...x,
      inBasket: inBasketIds.includes(x.id),
    }));

    return {
      ...state,
      basket: updatedBasket,
      products: updatedProducts,
    };
  }),
  on(MarketplaceActions.CheckoutStart, (state, action) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(MarketplaceActions.CheckoutSuccess, (state, action) => {
    const updatedBoughtProducts = [
      ...state.boughtProducts,
      ...state.basket.slice(),
    ];
    const boughtProdcutsIds = updatedBoughtProducts.map((x) => x.id);
    const updatedProducts = state.products.filter(
      (x) => !boughtProdcutsIds.includes(x.id)
    );
    const basketCost = state.basket.reduce(
      (acc, curr) => (acc += curr.price),
      0
    );

    return {
      ...state,
      loading: false,
      wallet: state.wallet - basketCost,
      basket: [],
      boughtProducts: updatedBoughtProducts,
      products: updatedProducts,
    };
  }),
  on(MarketplaceActions.CheckoutFail, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

import { createReducer, on } from '@ngrx/store';

import { Product } from 'src/app/models/product.model';
import * as BasketActions from './basket.actions';

export interface State {
  basket: Product[];
  wallet: number;
}

const initialState: State = {
  basket: [],
  wallet: 100,
};

export const basketReducer = createReducer(
  initialState,
  on(BasketActions.AddProduct, (state, action) => {
    const updatedBasket = [...state.basket, { ...action.product }];

    return {
      ...state,
      basket: updatedBasket,
    };
  }),
  on(BasketActions.RemoveProduct, (state, action) => {
    const updatedBasket = state.basket.filter(
      (x) => x.id !== action.product.id
    );

    return {
      ...state,
      basket: updatedBasket,
    };
  }),
  on(BasketActions.CheckoutSuccess, (state, action) => {
    const basketCost = state.basket.reduce(
      (acc, curr) => (acc += curr.price),
      0
    );

    return {
      ...state,
      wallet: state.wallet - basketCost,
      basket: [],
    };
  }),
);

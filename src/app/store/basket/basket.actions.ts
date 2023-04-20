import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { Client } from '../../models/client.model';

const ADD_PRODUCT_TO_BASKET = '[Basket] Add Product';
const REMOVE_PRODUCT_FROM_BASKET = '[Basket] Remove Product';
const CHECKOUT_START = '[Checkout] Payment start';
const CHECKOUT_SUCCESS = '[Checkout] Payment success';

export const AddProduct = createAction(
  ADD_PRODUCT_TO_BASKET,
  props<{ product: Product }>()
);

export const RemoveProduct = createAction(
  REMOVE_PRODUCT_FROM_BASKET,
  props<{ product: Product }>()
);

export const CheckoutStart = createAction(
  CHECKOUT_START,
  props<{ client: Client; products: Product[] }>()
);

export const CheckoutSuccess = createAction(
  CHECKOUT_SUCCESS,
  props<{ products: Product[] }>()
);

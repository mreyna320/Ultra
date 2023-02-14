import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { Client } from '../../models/client.model';

const ADD_PRODUCT_TO_BASKET = '[Basket] Add Product';
const REMOVE_PRODUCT_FROM_BASKET = '[Basket] Remove Product';
const PRODUCTS_FETCH_START = '[Marketplace] Products fetch start';
const PRODUCTS_FETCH_SUCCESS = '[Marketplace] Products fetch success';
const PRODUCTS_FETCH_FAIL = '[Marketplace] Products fetch error';
const CHECKOUT_START = '[Checkout] Payment start';
const CHECKOUT_SUCCESS = '[Checkout] Payment success';
const CHECKOUT_FAIL = '[Checkout] Payment error';

export const AddProduct = createAction(
  ADD_PRODUCT_TO_BASKET,
  props<{ product: Product }>()
);

export const RemoveProduct = createAction(
  REMOVE_PRODUCT_FROM_BASKET,
  props<{ product: Product }>()
);

export const ProductsFetchStart = createAction(PRODUCTS_FETCH_START);

export const ProductsFetchFail = createAction(
  PRODUCTS_FETCH_FAIL,
  props<{ error: string }>()
);

export const ProductsFetchSuccess = createAction(
  PRODUCTS_FETCH_SUCCESS,
  props<{ products: Product[] }>()
);

export const CheckoutStart = createAction(
  CHECKOUT_START,
  props<{ client: Client; products: Product[] }>()
);

export const CheckoutFail = createAction(
  CHECKOUT_FAIL,
  props<{ error: string }>()
);

export const CheckoutSuccess = createAction(CHECKOUT_SUCCESS);

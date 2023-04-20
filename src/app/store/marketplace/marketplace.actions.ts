import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';

const PRODUCTS_FETCH_START = '[Marketplace] Products fetch start';
const PRODUCTS_FETCH_SUCCESS = '[Marketplace] Products fetch success';
const PRODUCTS_FETCH_FAIL = '[Marketplace] Products fetch error';
const SET_BOUGHT_PRODUCTS = '[Marketplace] Set bought products';

export const ProductsFetchStart = createAction(PRODUCTS_FETCH_START);

export const ProductsFetchFail = createAction(
  PRODUCTS_FETCH_FAIL,
  props<{ error: string }>()
);

export const ProductsFetchSuccess = createAction(
  PRODUCTS_FETCH_SUCCESS,
  props<{ products: Product[]; boughtProdIds: number[] }>()
);

export const SetBoughtProductsIds = createAction(
  SET_BOUGHT_PRODUCTS,
  props<{ products: Product[] }>()
);

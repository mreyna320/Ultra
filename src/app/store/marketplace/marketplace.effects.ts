import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map, delay } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AppActions from './marketplace.actions';
import { Product } from '../../models/product.model';

const PRODUCTS_MOCK: Product[] = [
  {
    id: 1,
    img: 'https://m.media-amazon.com/images/I/515SWL+5eOL._AC_SX385_.jpg',
    name: 'Chocolate',
    price: 13.5,
  },
  {
    id: 2,
    img: 'https://m.media-amazon.com/images/I/515SWL+5eOL._AC_SX385_.jpg',
    name: 'Galletitas',
    price: 22.3,
  },
  {
    id: 3,
    img: 'https://m.media-amazon.com/images/I/515SWL+5eOL._AC_SX385_.jpg',
    name: 'Chicles',
    price: 7.5,
  },
  {
    id: 4,
    img: 'https://m.media-amazon.com/images/I/515SWL+5eOL._AC_SX385_.jpg',
    name: 'Libros',
    price: 6.0,
  },
  {
    id: 5,
    img: 'https://m.media-amazon.com/images/I/515SWL+5eOL._AC_SX385_.jpg',
    name: 'Caramelos',
    price: 28.75,
  },
];

@Injectable()
export class MarketplaceEffects {
  constructor(private actions$: Actions) {}

  checkout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.CheckoutStart),
        delay(1000),
        mergeMap((checkoutAction) => {
          return of(checkoutAction).pipe(
            map(() => AppActions.CheckoutSuccess()),
            catchError((err) => of(AppActions.CheckoutFail(err)))
          );
        })
      ),
    { dispatch: true }
  );

  productsFetch = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.ProductsFetchStart),
        delay(1000),
        mergeMap(() => {
          return of(null).pipe(
            map(() =>
              AppActions.ProductsFetchSuccess({ products: PRODUCTS_MOCK })
            ),
            catchError((err) => of(AppActions.ProductsFetchFail(err)))
          );
        })
      ),
    { dispatch: true }
  );
}

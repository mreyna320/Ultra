import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError, map, delay } from 'rxjs/operators';
import { of } from 'rxjs';

import * as BasketActions from './basket.actions';
import * as uiActions from '../ui/ui.actions';
import * as marketplaceActions from '../marketplace/marketplace.actions';

@Injectable()
export class BasketEffects {
  constructor(private actions$: Actions) {}

  checkout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BasketActions.CheckoutStart),
        delay(1000),
        mergeMap((checkoutAction) => {
          return of(checkoutAction).pipe(
            map(() =>
              BasketActions.CheckoutSuccess({
                products: checkoutAction.products,
              })
            ),
            catchError((err) => {
              return of(uiActions.SetError(err));
            })
          );
        })
      ),
    { dispatch: true }
  );

  checkoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BasketActions.CheckoutSuccess),
        mergeMap((action) =>
          of(
            marketplaceActions.SetBoughtProductsIds({
              products: action.products,
            })
          )
        )
      ),
    { dispatch: true }
  );
}

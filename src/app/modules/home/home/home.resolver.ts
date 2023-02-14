import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as MarketplaceActions from '../../../store/marketplace/marketplace.actions';
import { Product } from 'src/app/models/product.model';

@Injectable({ providedIn: 'root' })
export class HomeResolverService implements Resolve<Product[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('marketplace').pipe(
      take(1),
      switchMap((marketplaceState) => {
        if (marketplaceState.mustFetchProducts) {
          this.store.dispatch(MarketplaceActions.ProductsFetchStart());
          return this.actions$.pipe(
            ofType(MarketplaceActions.ProductsFetchSuccess),
            map((action) => action.products),
            take(1)
          );
        } else {
          return of(marketplaceState.products);
        }
      })
    );
  }
}

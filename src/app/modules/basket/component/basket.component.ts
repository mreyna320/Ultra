import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription, tap } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as basketActions from 'src/app/store/basket/basket.actions';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent implements OnInit, OnDestroy {
  basket: Product[];
  totalPrice = 0;

  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('basket')
      .pipe(
        map((state) => {
          return state.basket;
        }),
        tap((basket) => {
          this.basket = basket;
          this.totalPrice = basket.reduce((prev, curr) => prev + curr.price, 0);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  removeFromBasket(product: Product): void {
    this.store.dispatch(basketActions.RemoveProduct({ product }));
  }
}

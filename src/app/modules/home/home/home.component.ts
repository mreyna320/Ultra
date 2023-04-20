import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as basketActions from 'src/app/store/basket/basket.actions';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[];
  prodIdsInBasket: number[];

  private subscriptions: Subscription[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const a = this.store
      .select('marketplace')
      .subscribe(({ products, boughtProdIds }) => {
        this.products = products.filter((x) => !boughtProdIds.includes(x.id));
      });

    const b = this.store
      .select('basket')
      .subscribe(
        ({ basket }) => (this.prodIdsInBasket = basket.map((x) => x.id))
      );

    this.subscriptions = [a, b];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  addProductToBasket(product: Product): void {
    this.store.dispatch(basketActions.AddProduct({ product }));
  }
}

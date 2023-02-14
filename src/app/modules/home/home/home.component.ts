import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as marketplaceActions from 'src/app/store/marketplace/marketplace.actions';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[];

  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('marketplace')
      .subscribe((marketplace) => {
        this.products = marketplace.products;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  addProductToBasket(product: Product): void {
    this.store.dispatch(marketplaceActions.AddProduct({ product }));
  }
}

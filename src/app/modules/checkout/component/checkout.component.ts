import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as marketplaceActions from 'src/app/store/marketplace/marketplace.actions';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  totalPrice = 0;
  basketProducts: Product[];
  form: FormGroup;
  paymentSuccess: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastname: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      email: [null, [Validators.required, Validators.email]],
      street: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
    });

    const a = this.actions$
      .pipe(
        ofType(marketplaceActions.CheckoutSuccess),
        tap((data) => {
          this.paymentSuccess = true;
        })
      )
      .subscribe();

    const b = this.store
      .select('marketplace')
      .pipe(
        map((marketplace) => {
          return marketplace.basket;
        }),
        tap((basket) => {
          this.basketProducts = basket;
          this.totalPrice = basket.reduce((prev, curr) => prev + curr.price, 0);
        })
      )
      .subscribe();

    this.subscriptions.push(a, b);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  pay(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const clientData: Client = this.form.value;

    this.store.dispatch(
      marketplaceActions.CheckoutStart({
        client: clientData,
        products: this.basketProducts,
      })
    );
  }
}

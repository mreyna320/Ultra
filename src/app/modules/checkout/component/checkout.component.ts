import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription, tap } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as basketActions from 'src/app/store/basket/basket.actions';
import { Product } from 'src/app/models/product.model';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  wallet = 0;
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
        ofType(basketActions.CheckoutSuccess),
        tap((data) => (this.paymentSuccess = true))
      )
      .subscribe();

    const b = this.store
      .select('basket')
      .pipe(
        tap(({ basket, wallet }) => {
          this.basketProducts = basket;
          this.totalPrice = basket.reduce((prev, curr) => prev + curr.price, 0);
          this.wallet = wallet;
          console.log(wallet, this.totalPrice);
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
      basketActions.CheckoutStart({
        client: clientData,
        products: this.basketProducts,
      })
    );
  }
}

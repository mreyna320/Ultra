import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  wallet: number;
  basketCount: number;

  private storeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('marketplace')
      .subscribe((marketPlace) => {
        this.wallet = marketPlace.wallet;
        this.basketCount = marketPlace.basket.length;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}

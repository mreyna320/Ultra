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
      .select('basket')
      .subscribe(({ basket, wallet }) => {
        this.wallet = wallet;
        this.basketCount = basket.length;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}

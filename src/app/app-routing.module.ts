import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'basket',
    loadChildren: () =>
      import('./modules/basket/basket.module').then((m) => m.BasketModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  //   {
  //     path: 'shopping-list',
  //     loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  //   },
  //   {
  //     path: 'auth',
  //     loadChildren: './auth/auth.module#AuthModule'
  //   }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BasketComponent } from './component/basket.component';

const routes: Routes = [{ path: '', component: BasketComponent }];

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BasketModule {}

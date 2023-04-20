import { NgModule } from '@angular/core';
import { IsInArrPipe } from './pipes/is-in-array.pipe';

@NgModule({
  declarations: [IsInArrPipe],
  exports: [IsInArrPipe],
})
export class SharedModule {}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isInArr' })
export class IsInArrPipe implements PipeTransform {
  transform(id: any, ids: any[]) {
    return ids.some((x) => x === id);
  }
}

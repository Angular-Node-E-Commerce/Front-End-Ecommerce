import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
  standalone: true
})
export class TotalPipe implements PipeTransform {

  transform(price: number, quantity: number): number {
    return price * quantity;
  }
}

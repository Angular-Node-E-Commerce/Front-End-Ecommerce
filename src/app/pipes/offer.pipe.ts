import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offer',
  standalone: true
})
export class OfferPipe implements PipeTransform {

  transform(price: number, discountPercentage: number, quantity: number = 1): string {
    if (discountPercentage && discountPercentage > 0) {
      const discountAmount = (price * discountPercentage) / 100;
      const discountedPrice = price - discountAmount;
      return `${(discountedPrice * quantity).toFixed(2)}`;
    }
    return `${(price * quantity).toFixed(2)}`;
  }

}

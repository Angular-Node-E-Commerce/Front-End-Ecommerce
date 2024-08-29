import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OfferPipe } from './../../pipes/offer.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, OfferPipe],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  decreaseCounter(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  increaseCounter(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  removeItem(item: any) {
    this.cartService.removeItem(item.id);
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

}

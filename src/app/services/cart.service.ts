import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: any, quantity: number = 1) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(item => item.id === product.id);
    if (itemIndex > -1) {
      currentItems[itemIndex].quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...product, quantity }]);
    }
  }

  getCartItems() {
    return this.cartItems.value;
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  removeItem(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItems.next(updatedItems);
  }

  getTotalItemsCount() {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }
}

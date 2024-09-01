import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartItems: any[] = [];
  totalItems = 0;
  totalPrice = 0;
  userDetails: any;
  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalItems = items.reduce((total, item) => total + item.quantity, 0);
      this.totalPrice = this.getTotalPrice();
      this.userDetails = this.authService.getCurrentUser();
      console.log('User details:', this.userDetails);
    });
  }
  

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}

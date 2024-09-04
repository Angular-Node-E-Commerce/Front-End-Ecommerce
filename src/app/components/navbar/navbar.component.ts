import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  constructor(private cartService: CartService, private authService: AuthService, private router: Router, ) {}

  ngOnInit() {
    this.userDetails = this.authService.getCurrentUser();
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalItems = items.reduce((total, item) => total + item.quantity, 0);
      this.totalPrice = this.getTotalPrice();
      this.userDetails = this.authService.getCurrentUser();
      if (this.userDetails) {
        console.log('User details:', this.userDetails);
        console.log('User details:', this.userDetails.role);
        console.log(this)
      } else {
        console.log('User details not available');
      }
    });

  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }


  logOut(){
    this.authService.removeUser();
    this.authService.removeToken();
    this.authService.removeRole();
    this.router.navigate(['/login'],{ replaceUrl: true });
    console.log('UserRemoved From LocalStorage')
  }
}

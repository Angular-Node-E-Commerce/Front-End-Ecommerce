import { Component , Input , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesRequestService } from '../../services/games-request.service';
import { CounterService } from '../../services/counter.service';
import { CartService } from '../../services/cart.service';
import { RatingPipe } from '../../pipes/rating.pipe';
import { TotalPipe } from '../../pipes/total.pipe';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, RatingPipe, TotalPipe, NgFor],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent {
  gameDetails: any;
  quantity: number = 1;
  total: number = 0;



  constructor(
    private route: ActivatedRoute,
    private gamesRequestService: GamesRequestService,
    private counterService: CounterService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.gamesRequestService.getGameDetails(id).subscribe((res: any)=> {
        this.gameDetails = res.data.game;
        this.counterService.getCounter().subscribe((res) => (this.counter = res));
        this.calculateTotal();
      }, (err) => {
        console.error('Error fetching game details:', err);
        this.gameDetails = null; // Reset gameDetails if error occurs.
      })
    }
  }
  counter = 0;
  // private counterService = inject(CounterService)

  increaseQuantity() {
    this.quantity++;
    this.calculateTotal();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.gameDetails.price * this.quantity;
  }

  addToCart() {
    this.cartService.addToCart(this.gameDetails, this.quantity);
 
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
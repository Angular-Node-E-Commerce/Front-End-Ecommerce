import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CarticonComponent } from '../../icons/carticon/carticon.component';
import { Router, RouterLink } from '@angular/router';
import { CounterService } from '../../services/counter.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [CarticonComponent],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.css'
})
export class TrendingCardComponent {
  @Input() gameItem: any;
  @Output() handleSendData = new EventEmitter<string>();

  constructor(
    private router: Router,
    private counterService: CounterService,
    private cartService: CartService
  ) {}

  counter = 0;


  ngOnInit() {
    if (!this.gameItem || !this.gameItem.id) {
      console.error('Game Item or Game ID is undefined');
    }
    this.counterService.getCounter().subscribe((res) => (this.counter = res));
  }

  increaseCounter() {
    this.counterService.setCounter(this.counter + 1);
  }

  addToCart() {
    this.cartService.addToCart(this.gameItem);
  }

  handleRedirect(id: string) {
    console.log(id); // This should log the id to the console
    if (id) {
      console.log('Navigating to game details with id:', id);
      this.router.navigate(['/game-details', id]);
    } else {
      console.error('Game ID is undefined');
    }
  }


}

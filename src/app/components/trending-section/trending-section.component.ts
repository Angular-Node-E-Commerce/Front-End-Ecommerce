import { Component } from '@angular/core';
import { TrendingCardComponent } from '../trending-card/trending-card.component';
import { GameCardComponent } from './../../components/game-card/game-card.component';
import { NgClass, NgFor, CommonModule } from '@angular/common';
import { GamesRequestService } from '../../services/games-request.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-trending-section',
  standalone: true,
  imports: [
    TrendingCardComponent,
    GameCardComponent,
    NgClass,
    NgFor,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.css',
})
export class TrendingSectionComponent {
  games: any[] = []
  isLoading: Boolean = false;
  constructor(private gamesRequestService: GamesRequestService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.gamesRequestService.getGamesList().subscribe((res: any) => {
      console.log('Data received from service:', res);
      this.handleData(res);
    });
    this.isLoading = false;
  }
  trackByIndex(index: number, game: any): number {
    return game.id; // or any unique identifier
  }

  handleData(data: any) {
    this.games = data.data.games;
  }
}

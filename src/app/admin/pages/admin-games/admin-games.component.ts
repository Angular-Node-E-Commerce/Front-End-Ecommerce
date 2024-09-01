import { Component } from '@angular/core';
import { AdminAddGameListComponent } from '../admin-add-game-list/admin-add-game-list.component';
import { RouterLink } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-games',
  standalone: true,
  imports: [AdminAddGameListComponent, RouterLink, NgFor],
  templateUrl: './admin-games.component.html',
  styleUrl: './admin-games.component.css',
})
export class AdminGamesComponent {
  games: any[] = [];
  filterGames: any[] = [];
  error: string | null = null;

  constructor(
    private gameRequestServer: GamesRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameRequestServer.getGamesList().subscribe((res: any) => {
      console.log('Data received from service:', res);
      this.handleData(res);
    });
  }

  handleData(data: any) {
    if (Array.isArray(data)) {
      this.games = data;
    } else if (data && data.games) {
      this.games = data.games;
    } else if (data && data.data && data.data.games) {
      this.games = data.data.games;
    } else {
      console.error('Unexpected data format:', data);
    }

    this.filterGames = [...this.games];
  }

  editGame(gameId: string) {
    this.router.navigate(['/edit-add-admin', gameId]);
  }

  deleteGame(gameId: string) {
    if (!gameId) {
      console.error('Game ID is undefined');
      return;
    }

    this.gameRequestServer.deletegame(gameId).subscribe({
      next: () => {
        console.log('Game deleted successfully');
        // Remove the deleted game from the local games array
        this.games = this.games.filter((game) => game._id !== gameId);
      },
      error: (error) => {
        console.error('Error deleting game:', error);
        this.error =
          typeof error === 'string'
            ? error
            : error.message || 'An error occurred while deleting the game.';
      },
    });
  }
}

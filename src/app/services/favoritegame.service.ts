import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritegameService {
  private favoriteGames: any[] = [];

  toggleFavorite(game: any) {
    const gameIndex = this.favoriteGames.findIndex(favGame => favGame._id === game._id);

    if (gameIndex === -1) {
      this.favoriteGames.push(game);
      console.log('Game added to favorites:', game);
    } else {
      this.favoriteGames.splice(gameIndex, 1);
      console.log('Game removed from favorites:', game);
    }
  }

  isFavorite(game: any): boolean {
    return this.favoriteGames.some(favGame => favGame._id === game._id);
  }

  getFavorites(): any[] {
    return this.favoriteGames;
  }
}

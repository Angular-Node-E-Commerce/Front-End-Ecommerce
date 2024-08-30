import { Component } from '@angular/core';
import { AdminAddGameListComponent } from '../admin-add-game-list/admin-add-game-list.component';
import { RouterLink } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { NgFor } from '@angular/common';

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

  constructor(private gameRequestServer: GamesRequestService) {}
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
  // handleData(data: any) {
  //   // افتراض أن البيانات هي مصفوفة مباشرةً
  //   this.game = Array.isArray(data) ? data : (data.games || []);

  //   this.filterGames = [...this.game];
  // }
}

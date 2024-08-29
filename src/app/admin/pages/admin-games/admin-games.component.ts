import { Component } from '@angular/core';
import { AdminAddGameListComponent } from '../admin-add-game-list/admin-add-game-list.component';
<<<<<<< HEAD
=======
import { RouterLink } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { NgFor } from '@angular/common';
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab

@Component({
  selector: 'app-admin-games',
  standalone: true,
<<<<<<< HEAD
  imports: [AdminAddGameListComponent],
=======
  imports: [AdminAddGameListComponent, RouterLink, NgFor],
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab
  templateUrl: './admin-games.component.html',
  styleUrl: './admin-games.component.css'
})
export class AdminGamesComponent {
<<<<<<< HEAD

}
=======
  game: any[] = [];
  filterGames: any[] = [];

  constructor(private gameRequestServer: GamesRequestService) { }
  ngOnInit(): void {
    this.gameRequestServer.getGamesList().subscribe((res: any) => {
      console.log('Data received from service:', res);
      this.handleData(res);
    });
  }
  handleData(data: any) {
    if (Array.isArray(data)) {
      this.game = data;
    } else if (data && data.games) {
      this.game = data.games;
    } else if (data && data.data && data.data.games) {
      this.game = data.data.games;
    } else {
      console.error('Unexpected data format:', data);
    }

    this.filterGames = [...this.game];
  }
  // handleData(data: any) {
  //   // افتراض أن البيانات هي مصفوفة مباشرةً
  //   this.game = Array.isArray(data) ? data : (data.games || []);

  //   this.filterGames = [...this.game];
  // }

};

>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab

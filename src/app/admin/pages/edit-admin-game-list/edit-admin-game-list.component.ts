import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { ActivatedRoute, Router } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab

@Component({
  selector: 'app-edit-admin-game-list',
  standalone: true,
<<<<<<< HEAD
  imports: [],
=======
  imports: [CommonModule, FormsModule],
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab
  templateUrl: './edit-admin-game-list.component.html',
  styleUrl: './edit-admin-game-list.component.css'
})
export class EditAdminGameListComponent {
<<<<<<< HEAD

=======
  game: any = {
    title: '',
    image: ''
  };
  private gameId!: string; // Use definite assignment assertion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesRequestService: GamesRequestService
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id') ?? ''; // Provide a default value
    this.gamesRequestService.getGamesAdminDetails(this.gameId).subscribe((data: any) => {
      this.game = data;
    });
  }

  onSubmit() {
    this.gamesRequestService.updateGame(this.gameId, this.game).subscribe((res: any) => {
      console.log('Game updated successfully', res);
      this.router.navigate(['/edit-admin']);
    }, (error) => {
      console.error('Error updating game', error);
    });
  }
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-admin-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-admin-game-list.component.html',
  styleUrl: './edit-admin-game-list.component.css',
})
export class EditAdminGameListComponent {
  game: any = {
    title: '',
    image: '',
  };
  private gameId!: string; // Use definite assignment assertion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesRequestService: GamesRequestService
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id') ?? ''; // Provide a default value
    this.gamesRequestService
      .getGameDetails(this.gameId)
      .subscribe((data: any) => {
        this.game = data;
      });
  }

  onSubmit() {
    this.gamesRequestService.updategame(this.gameId, this.game).subscribe(
      (res: any) => {
        console.log('Game updated successfully', res);
        this.router.navigate(['/edit-admin']);
      },
      (error) => {
        console.error('Error updating game', error);
      }
    );
  }
}

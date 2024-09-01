import { Component } from '@angular/core';
import { EditAdminGameListComponent } from '../edit-admin-game-list/edit-admin-game-list.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GamesRequestService } from '../../../services/games-request.service';

@Component({
  selector: 'app-admin-add-game-list',
  standalone: true,
  imports: [EditAdminGameListComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-add-game-list.component.html',
  styleUrl: './admin-add-game-list.component.css',
})
export class AdminAddGameListComponent {
  game = {
    title: '',
    description: '',
    price: '',
    discount: '',
    quantity: '',
    imageCover: null as File | null,
  };

  constructor(
    private router: Router,
    private gamesRequestService: GamesRequestService
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.game.imageCover = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.game.title);
    formData.append('description', this.game.description);
    formData.append('price', this.game.price);
    formData.append('discount', this.game.discount);
    formData.append('quantity', this.game.quantity);
    if (this.game.imageCover) {
      formData.append('imageCover', this.game.imageCover);
    }

    console.log('FormData:', formData); // Log the FormData to verify contents

    this.gamesRequestService.addgame(formData).subscribe({
      next: (res: any) => {
        console.log('Game added successfully', res);
        this.game = {
          title: '',
          description: '',
          price: '',
          discount: '',
          quantity: '',
          imageCover: null as File | null,
        };
        this.router.navigate(['/admin-games']);
      },
      error: (error) => {
        console.error('Error adding game', error);
        if (error.error && error.error.message) {
          console.error('Server error message:', error.error.message);
        }
      },
    });
  }
}

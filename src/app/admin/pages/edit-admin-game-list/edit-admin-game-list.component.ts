import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories-request.service';

@Component({
  selector: 'app-edit-admin-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-admin-game-list.component.html',
  styleUrl: './edit-admin-game-list.component.css',
})
export class EditAdminGameListComponent {
  categories: any[] = [];
  error: string | null = null;

  game = {
    title: '',
    description: '',
    price: '',
    category: '',
    discount: '',
    quantity: '',
    imageCover: null as File | null,
  };
  private gameId!: string; // Use definite assignment assertion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesRequestService: GamesRequestService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
        console.log('Data received from service:', res.data.categories);
        this.handleData(res.data.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.error =
          error.message || 'An error occurred while fetching categories.';
      },
    });
    this.gameId = this.route.snapshot.paramMap.get('id') ?? ''; // Provide a default value
    this.gamesRequestService
      .getGameDetails(this.gameId)
      .subscribe((data: any) => {
        this.game = data;
      });
  }
  handleData(data: any) {
    this.categories = data;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.game.imageCover = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.game.title);
    formData.set('description', this.game.description);
    formData.set('price', this.game.price);
    formData.set('discount', this.game.discount);
    formData.set('quantity', this.game.quantity);
    if (this.game.imageCover) {
      formData.set('imageCover', this.game.imageCover);
    }

    console.log(formData);
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    this.gamesRequestService.updategame(this.gameId, formData).subscribe({
      next: (res: any) => {
        console.log('Game updated successfully', res);
        this.router.navigate(['/admin-games']);
      },
      error: (error) => {
        console.error('Error updating game', error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRequestService } from '../../../services/users-request.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../../services/categories-request.service';
import { GamesRequestService } from '../../../services/games-request.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent implements OnInit {
  users: any[] = [];
  categories: any[] = [];
  games: any[] = [];
  orders: any[] = [];

  constructor(
    private usersRequestService: UsersRequestService,
    private categoriesRequestService: CategoriesService,
    private gamesRequestService: GamesRequestService,
  ) {}

  ngOnInit(): void {
    this.usersRequestService.getUsers().subscribe({
      next: (res: any) => {
        console.log('Data received from users service:', res);
        this.handleData(res);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

    this.gamesRequestService.getGamesList().subscribe({
      next: (res: any) => {
        console.log('Data received from games service:', res);
        this.handleDataGames(res);
      },
      error: (error) => {
        console.error('Error fetching games:', error);
      }
    });

    this.categoriesRequestService.getCategories().subscribe({
      next: (res: any) => {
        console.log('Data received from categories service:', res);
        this.handleDataCategories(res);
      },
      error: (error) => {
        console.error('Error fetching games:', error);
      }
    });




  }

  handleData(data: any) {
    this.users = data;
    console.log(data);
  }

  handleDataGames(data: any) {
    this.games = data;
  }

  handleDataCategories(data: any) {
    this.categories = data.data.categories;;
  }

}

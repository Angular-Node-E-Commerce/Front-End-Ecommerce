import { Component, OnInit } from '@angular/core';
import { GameCardComponent } from './../../components/game-card/game-card.component';
import { NgClass, NgFor, CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArrowLeftComponent } from '../../icons/arrow-left/arrow-left.component';
import { ArrowRightComponent } from '../../icons/arrow-right/arrow-right.component';
import { GamesRequestService } from '../../services/games-request.service';
import { CategoriesService } from '../../services/categories-request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [
    GameCardComponent,
    NgClass,
    NgFor,
    CommonModule,
    NgxPaginationModule,
    ArrowLeftComponent,
    ArrowRightComponent,
  ],
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css'], 
})
export class GamesPageComponent implements OnInit {
  games: any[] = [];
  filterGames: any[] = [];
  categories: any[] = [];
  searchtext: string = '';
  selectedCategory: string = 'all';
  GamesPerPage = 8;
  currentPage = 1;
  filteredGamesForCurrentPage: any[] = [];


  constructor(private gamesRequestService: GamesRequestService, private categoriesService: CategoriesService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.gamesRequestService.getGamesList().subscribe((res: any) => {
      console.log('Data received from service:', res);
      this.handleData(res);
    });
  
    this.categoriesService.getCategories().subscribe((res: any) => {
      console.log('Categories API Response:', res); 
      this.categories = res.data.categories;
    });
  }
  
  handleData(res: any) {
    console.log('Raw data:', res);
    if (res && res.data && Array.isArray(res.data.games)) {
      this.games = res.data.games;
    } else {
      console.error('Invalid data format received from API');
      this.games = [];
      this.filterGames = [];
      this.filteredGamesForCurrentPage = [];
    }
    console.log('Processed games array:', this.games);
    this.filterGames = [...this.games];
    this.updatePaginatedGames();
  }

  onSearchInput(event: any) {
    this.searchtext = event.target.value;
    this.currentPage = 1; // Reset to the first page
    this.handleSearch();
  }

  handleSearch() {
    this.filterGamesByCategory();
    this.filterGames = this.filterGames.filter((game) => {
      return game.title.toLowerCase().includes(this.searchtext.toLowerCase());
    })
       this.updatePaginatedGames();
  }

  filterGamesByCategory() {
    if (this.selectedCategory === 'all') {
      this.filterGames = [...this.games];
    } else {
      this.filterGames = this.games.filter(game => game.category === this.selectedCategory);
    }
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedGames();
  }
  
  onCategorySelected(id: string) {
    this.selectedCategory = id;
    console.log(this.selectedCategory);
    this.filterGamesByCategory()
    this.handleSearch();
  }
  
  updatePaginatedGames() {
    if (this.filterGames.length === 0) {
      console.error('No data found after filtering.');
      this.filteredGamesForCurrentPage = [];
      return;
    }
    
    const startIndex = (this.currentPage - 1) * this.GamesPerPage;
    const endIndex = startIndex + this.GamesPerPage;
  
    if (startIndex > this.filterGames.length) {
      this.currentPage = 1; 
      this.updatePaginatedGames();
      return;
    }
  
    this.filteredGamesForCurrentPage = this.filterGames.slice(startIndex, endIndex);
  
    if (this.currentPage > 1 && this.filteredGamesForCurrentPage.length === 0) {
      this.currentPage--;
      this.updatePaginatedGames();
    }
  }
  

  nextPage() {
    if (this.currentPage * this.GamesPerPage < this.games.length) {
      this.currentPage++;
      this.updatePaginatedGames();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedGames();
    }
  }

  handleReceiveData(id: string) {
    this.games = this.games.filter((game) => game.id !== id);
    this.filterGames = this.filterGames.filter((game) => game.id !== id);
    this.updatePaginatedGames();
  }
}

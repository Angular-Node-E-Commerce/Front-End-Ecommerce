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
  styleUrls: ['./games-page.component.css'],  // `styleUrls` should be in plural form
})
export class GamesPageComponent implements OnInit {
  games: any[] = [];
  filterGames: any[] = [];
  categories: any[] = [];
  searchtext: string = '';
  selectedCategory: string = 'all';
  GamesPerPage = 8;
  currentPage = 1;

  constructor(private gamesRequestService: GamesRequestService, private categoriesService: CategoriesService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.gamesRequestService.getGamesList().subscribe((res: any) => {
      console.log('Data received from service:', res);
      this.handleData(res);
    });
  
    this.categoriesService.getCategories().subscribe((res: any) => {
      console.log('Categories API Response:', res); // طبع كل الرد من الـ API
      this.categories = res.data.categories;
    });
  }
  
  handleData(data: any) {
    console.log('Raw data:', data);
    if (data && data.data && Array.isArray(data.data.games)) {
      this.games = data.data.games;
    } else {
      console.error('Invalid data format received from API');
      this.games = [];
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
      return game.title && typeof game.title === 'string' && game.title.toLowerCase().includes(this.searchtext.toLowerCase());
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
    // this.handleSearch();
  }
  
  

  updatePaginatedGames() {
    const startIndex = (this.currentPage - 1) * this.GamesPerPage;
    const endIndex = startIndex + this.GamesPerPage;

    // Slice the filtered games for pagination
    this.filterGames = this.filterGames.slice(startIndex, endIndex);

    // Handle case where the current page is out of range due to filtering
    if (this.filterGames.length === 0 && this.currentPage > 1) {
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

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FavoritegameService } from '../../services/favoritegame.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userDetails: any;
  favoriteGames: any[] = [];

  constructor( private authService: AuthService, private favoriteGameService: FavoritegameService) { }


  ngOnInit() {
    this.userDetails = this.authService.getCurrentUser();
    this.favoriteGames = this.favoriteGameService.getFavorites();
  }};
  


import { Component } from '@angular/core';
import { EditAdminGameListComponent } from '../edit-admin-game-list/edit-admin-game-list.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-game-list',
  standalone: true,
  imports: [EditAdminGameListComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-add-game-list.component.html',
  styleUrl: './admin-add-game-list.component.css',
})
export class AdminAddGameListComponent {
  constructor() {}
  game = {
    title: '',
    image: null as File | null,
  };
}

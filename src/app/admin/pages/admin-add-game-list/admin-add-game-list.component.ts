import { Component } from '@angular/core';
import { EditAdminGameListComponent } from '../edit-admin-game-list/edit-admin-game-list.component';
import { RouterLink } from '@angular/router';
<<<<<<< HEAD
=======
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab

@Component({
  selector: 'app-admin-add-game-list',
  standalone: true,
<<<<<<< HEAD
  imports: [EditAdminGameListComponent, RouterLink],
=======
  imports: [EditAdminGameListComponent, RouterLink, FormsModule, CommonModule],
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab
  templateUrl: './admin-add-game-list.component.html',
  styleUrl: './admin-add-game-list.component.css'
})
export class AdminAddGameListComponent {

  constructor(){}
<<<<<<< HEAD
=======
  game = {
    title: '',
    image: null as File | null
  };
>>>>>>> 7dd4ec630135cbcc98abe30006e93b4160c174ab
}

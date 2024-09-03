import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesRequestService } from '../../../services/games-request.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-admin-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-admin-game-list.component.html',
  styleUrl: './edit-admin-game-list.component.css',
})
export class EditAdminGameListComponent implements OnInit {
  game = {
    title: '',
    description: '',
    price: '',
    discount: '',
    quantity: '',
    imageCover: null as File | null,
  };
  private gameId!: string; // Use definite assignment assertion
  gameForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesRequestService: GamesRequestService,
    private fb: FormBuilder,
  ) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]],
      discount: ['', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]],
      quantity: ['', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]],
      image: [null, Validators.required]
    });
  }

  get title(){
    return this.gameForm.get('title');
  }
  get description(){
    return this.gameForm.get('description');
  }
  get price(){
    return this.gameForm.get('price');
  }
  get discount(){
    return this.gameForm.get('discount');
  }
  get quantity(){
    return this.gameForm.get('quantity');
  }
  get image(){
    return this.gameForm.get('image');
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id') ?? ''; // Provide a default value
    console.log('Game ID:', this.gameId);

    this.gamesRequestService
      .getGameDetails(this.gameId)
      .subscribe((data: any) => {
        console.log('Fetched Game Data:', data);
        this.game = data;
        // Set the form controls with the retrieved game data
        this.gameForm.patchValue({
          title: this.game.title,
          description: this.game.description,
          price: this.game.price,
          discount: this.game.discount,
          quantity: this.game.quantity,
          // image: this.game.imageCover // Note: File input cannot be pre-filled
        });
        console.log('Form Value after patchValue:', this.gameForm.value);
      }, error => {
        console.error('Error fetching game details:', error);
      });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.game.imageCover = file;
    }
  }

  onSubmit() {
    if (this.gameForm.valid) {
      const formData = new FormData();
      formData.append('title', this.game.title);
      formData.set('description', this.game.description);
      formData.set('price', this.game.price);
      formData.set('discount', this.game.discount);
      formData.set('quantity', this.game.quantity);
      if (this.game.imageCover instanceof File) {
        formData.set('image', this.game.imageCover);
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
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories-request.service';

@Component({
  selector: 'app-add-categry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-categry.component.html',
  styleUrl: './add-categry.component.css'
})
export class AddCategryComponent {
  category = {
    name: '',
    description: '',
    image: null as File | null
  };

  constructor(private router: Router, private categoriesService: CategoriesService) { }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.category.image = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('description', this.category.description);
    if (this.category.image) {
      formData.append('image', this.category.image);
    }

    this.categoriesService.addCategory(formData).subscribe({
      next: (res: any) => {
        console.log('Category added successfully', res);
        this.category = { name: '', description: '', image: null };
        this.router.navigate(['/admin-categories']);
      },
      error: (error) => {
        console.error('Error adding category', error);
      }
    });
  }
}

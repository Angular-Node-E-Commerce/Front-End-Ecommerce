import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories-request.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent {
  category = {
    name: '',
    description: '',
    image: null as File | null,
  };
  private categoryId!: string; // Use definite assignment assertion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id') ?? ''; // Provide a default value
    this.categoriesService.getCategoryDetails(this.categoryId).subscribe({
      next: (data: any) => {
        this.category = data;
        console.log(this.category);
      },
      error: (error) => {
        console.error('Error fetching category details', error);
      },
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.category.image = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.set('name', this.category.name);
    formData.set('description', this.category.description);

    if (this.category.image) {
      formData.set('image', this.category.image);
    }

    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    console.log(formData);
    this.categoriesService.updateCategory(this.categoryId, formData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/admin-categories', res]);
        console.log('Category updated successfully', res);
      },
      error: (error) => {
        console.error('Error updating category', error);
      },
    });
  }
}

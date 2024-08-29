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
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  category: any = {
    name: '',
    description: '',
    image: null
  };
  private categoryId!: string; // Use definite assignment assertion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id') ?? ''; // Provide a default value
    this.categoriesService.getCategoryDetails(this.categoryId).subscribe({
      next: (data: any) => {
        this.category = data;
      },
      error: (error) => {
        console.error('Error fetching category details', error);
      }
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
    formData.append('name', this.category.name);
    formData.append('description', this.category.description);
    if (this.category.image instanceof File) {
      formData.append('image', this.category.image);
    }

    this.categoriesService.updateCategory(this.categoryId, formData).subscribe({
      next: (res: any) => {
        console.log('Category updated successfully', res);
        this.router.navigate(['/admin-categories']);
      },
      error: (error) => {
        console.error('Error updating category', error);
      }
    });
  }
}

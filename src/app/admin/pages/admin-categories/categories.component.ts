import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../services/categories-request.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  error: string | null = null;
  message: string | null = null;

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
        console.log('Data received from service:', res.data.categories);
        this.handleData(res.data.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.error = error.message || 'An error occurred while fetching categories.';
      }
    });
  }

  handleData(data: any) {
    this.categories = data;
  }

  editCategory(categoryId: string) {
    this.router.navigate(['/edit-category', categoryId]);
  }

  // deleteCategory(categoryId: string) {
  //   this.categoriesService.deleteCategory(categoryId).subscribe({
  //     next: () => {
  //       console.log('Category deleted successfully');
  //       // Remove the deleted category from the local categories array
  //       this.categories = this.categories.filter(category => category._id !== categoryId);
  //     },
  //     error: (error) => {
  //       console.error('Error deleting category:', error);
  //       this.error = typeof error === 'string' ? error : error.message || 'An error occurred while deleting the category.';
  //     }
  //   });
  // }



}

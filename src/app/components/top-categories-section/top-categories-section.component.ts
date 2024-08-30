import { Component } from '@angular/core';
import { TopCategoriesCardComponent } from "../top-categories-card/top-categories-card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../services/categories-request.service';
import { NgClass, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-categories-section',
  standalone: true,
  imports: [TopCategoriesCardComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './top-categories-section.component.html',
  styleUrl: './top-categories-section.component.css'
})
export class TopCategoriesSectionComponent {

  categories: any[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res: any) => {
      console.log('Data received from categories service:', res);
      this.handleData(res);
    });
  }

  trackByIndex(index: number, category: any): number {
    return category.id; // or any unique identifier
  }

  handleData(data: any) {
    this.categories = data.data.categories;
  }

}

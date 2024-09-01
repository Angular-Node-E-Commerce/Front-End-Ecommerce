import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-categories-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-categories-card.component.html',
  styleUrl: './top-categories-card.component.css',
})
export class TopCategoriesCardComponent implements OnInit {
  @Input() categoryItem: any;

  ngOnInit() {
    if (!this.categoryItem || !this.categoryItem.id) {
      console.error('Category Item or Category ID is undefined');
    }
  }
}

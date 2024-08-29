import { Component } from '@angular/core';
import { TopCategoriesCardComponent } from "../top-categories-card/top-categories-card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-categories-section',
  standalone: true,
  imports: [TopCategoriesCardComponent,RouterLink, RouterLinkActive],
  templateUrl: './top-categories-section.component.html',
  styleUrl: './top-categories-section.component.css'
})
export class TopCategoriesSectionComponent {

}

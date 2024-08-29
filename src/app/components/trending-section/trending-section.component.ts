import { Component } from '@angular/core';
import { TrendingCardComponent } from "../trending-card/trending-card.component";

@Component({
  selector: 'app-trending-section',
  standalone: true,
  imports: [TrendingCardComponent],
  templateUrl: './trending-section.component.html',
  styleUrl: './trending-section.component.css'
})
export class TrendingSectionComponent {

}

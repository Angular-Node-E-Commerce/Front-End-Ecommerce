import { Component } from '@angular/core';
import { TrendingSectionComponent } from "../../components/trending-section/trending-section.component";
import { TopCategoriesSectionComponent } from "../../components/top-categories-section/top-categories-section.component";
import { LandingSectionComponent } from "../../components/landing-section/landing-section.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ TrendingSectionComponent, TopCategoriesSectionComponent, LandingSectionComponent, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoading = false;
ngOnInit(){
  this.isLoading = true;  
}}

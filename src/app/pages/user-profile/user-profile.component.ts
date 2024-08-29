import { Component } from '@angular/core';
import { GamingLibraryComponent } from "../../components/gaming-library/gaming-library.component";
import { MostPopularComponent } from "../../components/most-popular/most-popular.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [GamingLibraryComponent, MostPopularComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}

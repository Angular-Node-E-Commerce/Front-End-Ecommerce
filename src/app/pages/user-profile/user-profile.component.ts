import { Component } from '@angular/core';
import { GamingLibraryComponent } from "../../components/gaming-library/gaming-library.component";
import { MostPopularComponent } from "../../components/most-popular/most-popular.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [GamingLibraryComponent, MostPopularComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userDetails: any;
  constructor( private authService: AuthService) { }


  ngOnInit() {
    this.userDetails = this.authService.getCurrentUser();}}


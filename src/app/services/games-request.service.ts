import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesRequestService {
  private apiUrl = 'https://games-shop-api.glitch.me/api/v1/games';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getGamesList() {
    return this.http.get(`${this.apiUrl}`);
  }

  getGameDetails(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addgame(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  updategame(id: string, formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/${id}`, formData, { headers });
  }

  deletegame(gameId: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${gameId}`, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersRequestService {
  private apiUrl = 'https://games-shop-api.glitch.me/api/v1/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    console.log('Login request body:', body);

    return this.http.post(`${this.apiUrl}/login/`, body);
  }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, user);
  }

  getUsers(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }


}

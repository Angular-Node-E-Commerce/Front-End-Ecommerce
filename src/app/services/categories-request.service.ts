import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'https://games-shop-api.glitch.me/api/v1/categories';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCategories(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }

  getCategoryDetails(id: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  addCategory(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/`, formData, { headers });
  }

  updateCategory(id: string, formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers });
  }
}
// deleteCategory(categoryId: string): Observable<any> {
//   const token = this.authService.getToken();
//   if (!token) {
//     throw new Error('Token is null. User is not authenticated.');
//   }
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   return this.http.delete(`${this.apiUrl}/${categoryId}`, { headers });
// }

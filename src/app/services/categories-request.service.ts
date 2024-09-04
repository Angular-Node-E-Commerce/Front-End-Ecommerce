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
    // const token = this.authService.getToken();
    // if (!token) {
    //   throw new Error('Token is null. User is not authenticated.');
    // }
    // const headers = new HttpHeaders().set('Authorization', token);
    // return this.http.get(this.apiUrl, { headers });
    return this.http.get(this.apiUrl);

  }

  getCategoryDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addCategory(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, formData);
  }

  updateCategory(id: string, formData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/`, formData);
  }

  deleteCategory(categoryId: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is null. User is not authenticated.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${categoryId}`, { headers });
  }
}

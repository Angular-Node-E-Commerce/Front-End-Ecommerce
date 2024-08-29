import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  setRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  removeRole(): void {
    localStorage.removeItem('userRole');
  }

  private base64UrlDecode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return decodeURIComponent(escape(window.atob(output)));
  }

  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.base64UrlDecode(parts[1]);
    return JSON.parse(decoded);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getToken(); // Assuming you have a method to get the token

  if (authToken) {
    console.log('Token:', authToken); // Log the token to verify its content
    const authReq = req.clone({
      // headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      headers: req.headers.set('Authorization', authToken)
    });
    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Token is invalid or expired');
          router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  } else {
    console.log('No token found'); // Log if no token is found
    router.navigate(['/login']);
    return next(req);
  }
};

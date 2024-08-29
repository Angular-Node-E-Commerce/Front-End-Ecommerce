// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';


// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
//     provideHttpClient()
//   ],
// };




// interceptor
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptorFn } from './auth.interceptor'; // Adjust the path as necessary

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(
      withInterceptors([authInterceptorFn])
    )
  ],
};




// app.config.ts
// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
//     provideHttpClient()
//   ],
// };

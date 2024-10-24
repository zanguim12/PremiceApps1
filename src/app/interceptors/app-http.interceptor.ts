import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Token-based authentication is commented out
    // if (!req.url.includes('/auth/login')){
    //   const newRequest = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
    //   });
    //   return next.handle(newRequest).pipe(
    //     catchError((error) => {
    //       if (error.status === 403 || error.status === 401) {
    //         this.router.navigateByUrl('/user/not-authorized');
    //       }
    //       throw error;
    //     })
    //   );
    // }

    // Simplified error handling
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 403 || error.status === 401) {
          this.router.navigateByUrl('/user/not-authorized');
        }
        throw error;
      })
    );
  }
}

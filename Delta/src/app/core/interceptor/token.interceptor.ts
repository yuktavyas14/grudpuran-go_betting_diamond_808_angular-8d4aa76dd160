import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
declare const paymentPro:any;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }
  origin:any=window.location.origin;
  access_key= "7dhY6HoY6ybzZQreUzIvOePUWWoVOH";
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.tokenHeader}`
      }
    });

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      paymentPro({
        "access_key": this.access_key,
        "auth_token": this.authService.tokenHeader,
        "origin": this.origin,
        authorization:0,

    style:{
        'color':'#9b8813'
    },
        // authorization:{
        //   key:1,
        //   // 0= logout
        //   // 1= login
        // }
  
          });
      // navigate /delete cookies or whatever

      // condition to check Whether Admin is logged in or user.

      localStorage.clear();
      window.location.reload()
      this.authService.authState.next(false);
      this.router.navigate(['/auth/login']);
      /* if you've caught / handled the error, you don't want to rethrow it unless you also want
      downstream consumers to have to handle it as well. */

      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}

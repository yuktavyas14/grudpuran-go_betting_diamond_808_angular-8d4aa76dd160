import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private myRoute: Router) {
  }
  user
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = new User();
    if (this.user.isLoggedIn() && (this.user.getData())) {
      return true;
    } else {
      // Sets the authentication state of the user to false and redirects to login page.
      this.auth.authState.next(false);
      this.myRoute.navigate(['/']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * @fileoverview AuthService is used for all user authentication related tasks.
   */

  authState = new BehaviorSubject<boolean>(false); // States that user is currently active or not.
  constructor(private router: Router,private apiService:ApiService) {
    const user = new User;
    if (user.isLoggedIn() && user.getData()) {
      this.authState.next(true);
    } else {
      this.authState.next(false);
      this.router.navigate(['/login']);
      sessionStorage.clear();
    }
  }

  /**
   * @param data takes username and password and sets the user token.
   */
  login(data: any): Observable<User> {
    return this.apiService.post('user/login', data);
  }
  verifyLoginOtp(data: any): Observable<User> {
    return this.apiService.post('telegram/verifyLoginOtp', data);
  }
  resendLoginOtp(data: any): Observable<User> {
    return this.apiService.post('telegram/resendLoginOtp', data);
  }
   /**
   * logouts the user from the browser and deletes the user-details required by the application for state-management.
   * @param logoutObj (required) takes user_id and token as params.
   */
  logout(logoutObj: any): Observable<any> {
    this.authState.next(false);
    return this.apiService.post('user/logout', logoutObj);
  }

  /**
   * @param data as username, name mobile  and password  required and referal_code is optional.
   */
   signup(data: any): Observable<User> {
    return this.apiService.post('user/signUp', data);
  }


   /* Returns true if user is logged in */
   get isLoggedIn() {
    return this.authState.asObservable();
  }

  /**
   * return string token and set into headers.
   */
  get tokenHeader() {
    return new User().getToken();
  }
}

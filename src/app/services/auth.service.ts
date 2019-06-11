import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

const currentUser = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser$ = new BehaviorSubject<string>(null);

  get loggedInUser() {
    return this.loggedInUser$.asObservable();
  }

  constructor() {
    this.loggedInUser$.next(currentUser);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!!token) {
      this.loggedInUser$.next(token);
    } else {
      this.loggedInUser$.next(null);
    }

    return !!token;
  }

  login(user) {
    localStorage.setItem('token', user);
    this.loggedInUser$.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInUser$.next(null);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub;

  loggedInUser = null;

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  ngOnInit() {
    this.sub = this.auth.loggedInUser.subscribe(u => {
      this.loggedInUser = u;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  buttonClicked(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.auth.logout();
  }

}

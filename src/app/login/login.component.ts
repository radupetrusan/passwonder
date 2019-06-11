import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { InputModel } from '../models/input-model';
import { UsersService } from '../services/users.service';
import { take } from 'rxjs/operators';
import { computeSimilarityIndex, average } from '../utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorText = '';

  @ViewChild('email') email: InputComponent;
  @ViewChild('password') password: InputComponent;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  reset() {
    this.password.value = null;
  }

  login() {
    const input = new InputModel({
      pressedKeys: [...this.password.pressedKeys],
      timeBetweenKeys: [...this.password.timeBetweenKeys],
      value: this.password.value
    });

    this.usersService.getUser(this.email.value, input.value)
      .valueChanges()
      .pipe(take(1))
      .subscribe(users => {
        if (!users.length) {
          this.errorText = 'Wrong username or password!';
          this.reset();
          return;
        }

        if (users.length > 1) {
          this.errorText = 'Something went wrong! Please contact an administrator!';
          this.reset();
          return;
        }

        const user = users[0];
        const indexes: number[] = [];
        user.inputs.forEach(i => {
          const index = computeSimilarityIndex(i, input);
          indexes.push(index);
        });

        const max = Math.max(...indexes);
        const avg = average(indexes);

        console.log('Max index: ', max);
        console.log('Average index: ', avg);

        if (max > 900 && avg > 800) {
          this.authService.login(user.username);
          this.router.navigate(['/']);
        } else {
          this.errorText = `We couldn't recognize your typing style! Are you the real owner of this account?`;
          this.reset();
        }
      });
  }

}

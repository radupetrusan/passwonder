import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { InputModel } from '../models/input-model';
import { UsersService } from '../services/users.service';
import { take } from 'rxjs/operators';
import { computeSimilarityIndex, average } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('email') email: InputComponent;
  @ViewChild('password') password: InputComponent;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['/']);
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
          console.log('Wrong username or password!');
          return;
        }

        if (users.length > 1) {
          console.log('There is an error!');
          return;
        }

        const user = users[0];
        const indexes: number[] = [];
        user.inputs.forEach(i => {
          const index = computeSimilarityIndex(i, input);
          indexes.push(index);
          console.log('Index: ', index);
        });

        const max = Math.max(...indexes);
        const avg = average(indexes);

        console.log('Max index: ', max);
        console.log('Average index: ', avg);

        if (max > 850 && avg > 750) {
          console.log('Logged in!');
        } else {
          console.log('Different person! Access denied!');
        }
      });
  }

}

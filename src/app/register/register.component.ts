import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { InputModel } from '../models/input-model';
import { computeSimilarityIndex } from '../utils';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('email') email: InputComponent;
  @ViewChild('password') password: InputComponent;
  @ViewChild('confirmPassword') confirmPassword: InputComponent;

  errorText = '';

  constructor(
    private router: Router,
    private usersService: UsersService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  private reset() {
    this.confirmPassword.reset();
    this.password.reset();
    this.email.reset();
  }

  async register() {
    const firstInput = new InputModel({
      pressedKeys: [...this.password.pressedKeys],
      timeBetweenKeys: [...this.password.timeBetweenKeys],
      value: this.password.value
    });

    const secondInput = new InputModel({
      pressedKeys: [...this.confirmPassword.pressedKeys],
      timeBetweenKeys: [...this.confirmPassword.timeBetweenKeys],
      value: this.confirmPassword.value
    });

    if (firstInput.value !== secondInput.value) {
      this.errorText = 'Confirm password is different than first password! Please try again!';
      this.reset();
      return;
    }

    const similarityIndex = computeSimilarityIndex(firstInput, secondInput);

    if (similarityIndex > 950) {
      const user = new User({
        username: this.email.value,
        password: this.password.value,
        inputs: [{ ...firstInput }, { ...secondInput }]
      });

      let exists = true;
      await this.usersService.userExists(user.username).then(r => exists = r);
      if (exists) {
        this.errorText = 'This user already exists! Please choose another username!';
        this.reset();
        this.email.value = null;
        return;
      }

      console.log('Similarity index: ' + similarityIndex);
      const similarityPercentage = similarityIndex / 1200 * 100;
      console.log('The 2 passwords are ' + similarityPercentage.toFixed(2) + '% similar!');

      this.usersService.createUser(user).then(res => {
        this.auth.login(user.username);
        this.router.navigate(['/']);
      });
    } else {
      this.errorText = 'Password typing styles are too different! Please enter again the password!';
      this.reset();
    }


  }
}

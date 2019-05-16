import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('email') email: InputComponent;
  @ViewChild('password') password: InputComponent;
  @ViewChild('confirmPassword') confirmPassword: InputComponent;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  analyze() {
    const passwordTimeBetween = [...this.password.timeBetweenKeys];
    const confirmPasswordTimeBetween = [...this.confirmPassword.timeBetweenKeys];
    const difference = [];

    if (passwordTimeBetween.length !== confirmPasswordTimeBetween.length) {
      console.log('The number of pressed keys are not equal!');
      return;
    }

    passwordTimeBetween.forEach((val, i) => {
      difference.push(Math.abs(val - confirmPasswordTimeBetween[i]));
    });

    console.log(passwordTimeBetween);
    console.log(confirmPasswordTimeBetween);
    console.log(difference);
  }

}

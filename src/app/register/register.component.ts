import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { InputModel } from '../models/InputModel';
import { computeSimilarityIndex } from '../utils';

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

  register() {
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

    const similarityIndex = computeSimilarityIndex(firstInput, secondInput);

    console.log('Similarity index: ' + similarityIndex);
    const similarityPercentage = similarityIndex / 1200 * 100;
    console.log('The 2 passwords are ' + similarityPercentage.toFixed(2) + '% similar!')
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() type: string;

  private pressedKeys: string[];
  private timeBetweenKeys: number[];

  private comparer: Date;

  constructor() { }

  ngOnInit() {
    this._initInput();
  }

  analyzeInput(event: KeyboardEvent) {
    this.pressedKeys.push(event.key);

    if (!!this.comparer) {
      const time = new Date();
      const timeBetween = time.getTime() - this.comparer.getTime();
      this.timeBetweenKeys.push(timeBetween);
      console.log(timeBetween);
    }

    this.comparer = new Date();
  }

  private _initInput() {
    this.pressedKeys = [];
    this.timeBetweenKeys = [];
    this.comparer = null;
  }

}

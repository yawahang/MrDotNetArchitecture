import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mr-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {

  @Input('placeholder') placeholder: string;
  @Input('formControlName') formControlName: FormControl;

  constructor() {

  }

  ngOnInit() {

  }

}

/**
 * @file button.component.ts
 * @author
 * @brief a micro component of a customized button.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}

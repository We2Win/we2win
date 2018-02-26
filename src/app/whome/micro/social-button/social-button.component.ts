import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent implements OnInit {
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}

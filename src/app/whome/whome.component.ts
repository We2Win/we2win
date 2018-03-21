import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../animations/animation';

@Component({
  selector: 'app-whome',
  templateUrl: './whome.component.html',
  styleUrls: ['./whome.component.css'],
  animations: [fadeInAnimation],
})
export class WhomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}

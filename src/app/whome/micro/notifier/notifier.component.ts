/**
 * @file notifier.component.ts
 * @author
 * @brief a micro component for showing notifications in header.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hidePopup() {
  }
}

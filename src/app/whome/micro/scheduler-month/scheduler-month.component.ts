/**
 * @file scheduler-day.component.ts
 * @author
 * @brief a micro component inside scheduler component.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduler-month',
  templateUrl: './scheduler-month.component.html',
  styleUrls: ['./scheduler-month.component.css']
})
export class SchedulerMonthComponent implements OnInit {
  record;

  constructor() { }

  ngOnInit() {
  }

}

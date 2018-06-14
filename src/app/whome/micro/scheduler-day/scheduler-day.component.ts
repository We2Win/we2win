/**
 * @file scheduler-day.component.ts
 * @author
 * @brief a micro component inside scheduler-week, scheduler component.
 */
import { Component, OnInit } from '@angular/core';
import { DatePickerService } from '../../services/date-picker.service';

@Component({
  selector: 'app-scheduler-day',
  templateUrl: './scheduler-day.component.html',
  styleUrls: ['./scheduler-day.component.css']
})
export class SchedulerDayComponent implements OnInit {
  record = {
    dateStr: ' ',
    day: ' '
  };

  constructor(
    private datePickerService: DatePickerService
  ) {
  }

  ngOnInit() {
    this.record['date'] = new Date(this.record.dateStr);
    if (this.record['dateStr']) {
      this.record['dateStr'] = this.record['date'].getDate();
    } else {
      this.record['dateStr'] = '';
    }
  }

  emitDate() {
    this.datePickerService.emitDate(this.record);
  }

}

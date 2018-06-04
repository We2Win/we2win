import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatePickerService } from '../../services/date-picker.service';
import { PostingService } from '../../services/posting.service';
import { MypostDirective } from '../../directives/mypost.directive';
import { PostItem } from '../../models/post-item';
import { SchedulerMonthComponent } from '../scheduler-month/scheduler-month.component';
import { SchedulerWeekComponent } from '../scheduler-week/scheduler-week.component';
import { SchedulerDayComponent } from '../scheduler-day/scheduler-day.component';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  providers: [PostingService, DatePickerService]
})
export class SchedulerComponent implements OnInit {
  @ViewChild(MypostDirective)
  private mypostDirective: MypostDirective;

  @Input('schedules') schedules;
  records = [];

  categories: Object = {
    'calendar': ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  };

  constructor(
    private postingService: PostingService,
    private datePickerService: DatePickerService
  ) {
    // this.datePickerService.changeType.subscribe(
    //   data => {
    //     this.records = [];
    //     switch (data) {
    //       case 'STANDARD':
    //         this.setCalendar(60000);
    //         break;
    //       case 'DELUXE':
    //         this.setCalendar(70000);
    //         break;
    //       case 'JUNIOR SWEET':
    //         this.setCalendar(100000);
    //         break;
    //       case 'ROYAL SWEET':
    //         this.setCalendar(120000);
    //         break;
    //     }
    //   }
    // );
  }

  ngOnInit() {
    this.setCalendar();
    setTimeout(() => {
      this.setCalendar();
    }, 1000);
  }

  setCalendar() {
    this.records = [];

    const today = new Date();
    const future = new Date();
    const todayDay = today.getDay();

    // for blanking past day of this week
    for (let i = 0; i < todayDay; ++i) {
      const record = {
        dateStr: undefined,
        day: undefined,
        hasSchedule: false
      };
      this.records.push(record);
    }

    // adding dates
    for (let i = 0; i < 91; i++) {
      const record = {
        dateStr: future.toDateString(),
        day: future.getDay(),
        hasSchedule: false,
      };
      this.records.push(record);
      future.setDate(future.getDate() + 1);
    }

    if (todayDay !== 0) {
      // for blanking future day of this week
      for (let i = 0; i < 7 - (todayDay); ++i) {
        const record = {
          dateStr: undefined,
          day: undefined,
          hasSchedule: false
        };
        this.records.push(record);
      }
    }

    console.log('schedules on Scheduler: ', this.schedules);
    // tslint:disable-next-line:forin
    for (const schedule in this.schedules) {
      const start = new Date(this.schedules[schedule]['duration-start']);
      const end = new Date(this.schedules[schedule]['duration-end']);
      const startIdx = (new Date(start.valueOf() - today.valueOf()).getDate());
      let endIdx = (new Date(future.valueOf() - end.valueOf()).getDate());
      if (endIdx < 0) {
        endIdx = future.getDate();
      }
      console.log(startIdx, endIdx);
      if (startIdx) {
        for (let i = startIdx; i <= endIdx; ++i) {
          this.records[i].hasSchedule = true;
          console.log('done at: ', i, this.records[i]);
        }
      }

    }

    console.log('records: ', this.records);

    this.addRecord(this.records);
  }

  addRecord(records) {
    const ref = this.mypostDirective.viewContainerRef;
    ref.clear();
    let count = 6, week;
    // tslint:disable-next-line:forin
    for (const record in records) {
      if (++count === 7) {
        count = 0;

        const date = new Date(records[record].dateStr);
        if (date.getDate() >= 1 && date.getDate() < 8) {
          this.postingService.loadComponent(ref,
            new PostItem(SchedulerMonthComponent, date.getMonth()));
        }
        week = this.postingService.loadComponent(ref,
          new PostItem(SchedulerWeekComponent, null));
      }

      this.postingService.loadComponent(week.rankingpost1Directive.viewContainerRef,
        new PostItem(SchedulerDayComponent, records[record]));
    }
  }
}

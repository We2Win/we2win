import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerMonthComponent } from './scheduler-month.component';

describe('SchedulerMonthComponent', () => {
  let component: SchedulerMonthComponent;
  let fixture: ComponentFixture<SchedulerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

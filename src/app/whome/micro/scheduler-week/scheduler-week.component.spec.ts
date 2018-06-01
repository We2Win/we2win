import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerWeekComponent } from './scheduler-week.component';

describe('SchedulerWeekComponent', () => {
  let component: SchedulerWeekComponent;
  let fixture: ComponentFixture<SchedulerWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

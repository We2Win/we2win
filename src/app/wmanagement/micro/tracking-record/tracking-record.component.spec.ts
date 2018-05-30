import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingRecordComponent } from './tracking-record.component';

describe('TrackingRecordComponent', () => {
  let component: TrackingRecordComponent;
  let fixture: ComponentFixture<TrackingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

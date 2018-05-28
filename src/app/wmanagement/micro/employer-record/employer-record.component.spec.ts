import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerRecordComponent } from './employer-record.component';

describe('EmployerRecordComponent', () => {
  let component: EmployerRecordComponent;
  let fixture: ComponentFixture<EmployerRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

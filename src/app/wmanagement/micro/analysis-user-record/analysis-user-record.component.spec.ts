import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisUserRecordComponent } from './analysis-user-record.component';

describe('AnalysisUserRecordComponent', () => {
  let component: AnalysisUserRecordComponent;
  let fixture: ComponentFixture<AnalysisUserRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisUserRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisUserRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

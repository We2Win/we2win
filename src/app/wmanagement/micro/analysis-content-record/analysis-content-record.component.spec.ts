import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisContentRecordComponent } from './analysis-content-record.component';

describe('AnalysisContentRecordComponent', () => {
  let component: AnalysisContentRecordComponent;
  let fixture: ComponentFixture<AnalysisContentRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisContentRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisContentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

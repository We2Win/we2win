import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisContentsRecordComponent } from './analysis-contents-record.component';

describe('AnalysisContentsRecordComponent', () => {
  let component: AnalysisContentsRecordComponent;
  let fixture: ComponentFixture<AnalysisContentsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisContentsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisContentsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

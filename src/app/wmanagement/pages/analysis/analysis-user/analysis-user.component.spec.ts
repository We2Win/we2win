import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisUserComponent } from './analysis-user.component';

describe('AnalysisUserComponent', () => {
  let component: AnalysisUserComponent;
  let fixture: ComponentFixture<AnalysisUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisContentsComponent } from './analysis-contents.component';

describe('AnalysisContentsComponent', () => {
  let component: AnalysisContentsComponent;
  let fixture: ComponentFixture<AnalysisContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

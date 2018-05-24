import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateChartComponent } from './template-chart.component';

describe('TemplateChartComponent', () => {
  let component: TemplateChartComponent;
  let fixture: ComponentFixture<TemplateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

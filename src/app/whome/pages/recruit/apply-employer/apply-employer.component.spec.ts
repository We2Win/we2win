import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyEmployerComponent } from './apply-employer.component';

describe('ApplyEmployerComponent', () => {
  let component: ApplyEmployerComponent;
  let fixture: ComponentFixture<ApplyEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

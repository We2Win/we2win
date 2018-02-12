import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFilteringComponent } from './select-filtering.component';

describe('SelectFilteringComponent', () => {
  let component: SelectFilteringComponent;
  let fixture: ComponentFixture<SelectFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

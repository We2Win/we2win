import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmanagementComponent } from './wmanagement.component';

describe('WmanagementComponent', () => {
  let component: WmanagementComponent;
  let fixture: ComponentFixture<WmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

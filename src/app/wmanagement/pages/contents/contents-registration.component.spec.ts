import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsRegistrationComponent } from './contents-registration.component';

describe('ContentsRegistrationComponent', () => {
  let component: ContentsRegistrationComponent;
  let fixture: ComponentFixture<ContentsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

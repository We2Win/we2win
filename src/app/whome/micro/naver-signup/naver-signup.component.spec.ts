import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaverSignupComponent } from './naver-signup.component';

describe('NaverSignupComponent', () => {
  let component: NaverSignupComponent;
  let fixture: ComponentFixture<NaverSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaverSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaverSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

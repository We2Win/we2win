import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaverLoginComponent } from './naver-login.component';

describe('NaverLoginComponent', () => {
  let component: NaverLoginComponent;
  let fixture: ComponentFixture<NaverLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaverLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaverLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMainComponent } from './site-main.component';

describe('SiteMainComponent', () => {
  let component: SiteMainComponent;
  let fixture: ComponentFixture<SiteMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

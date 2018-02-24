import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficetelComponent } from './officetel.component';

describe('OfficetelComponent', () => {
  let component: OfficetelComponent;
  let fixture: ComponentFixture<OfficetelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficetelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficetelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

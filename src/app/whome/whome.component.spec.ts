import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhomeComponent } from './whome.component';

describe('WhomeComponent', () => {
  let component: WhomeComponent;
  let fixture: ComponentFixture<WhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsModificationComponent } from './contents-modification.component';

describe('ContentsModificationComponent', () => {
  let component: ContentsModificationComponent;
  let fixture: ComponentFixture<ContentsModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

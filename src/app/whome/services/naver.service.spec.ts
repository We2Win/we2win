import { TestBed, inject } from '@angular/core/testing';

import { NaverService } from './naver.service';

describe('NaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NaverService]
    });
  });

  it('should be created', inject([NaverService], (service: NaverService) => {
    expect(service).toBeTruthy();
  }));
});

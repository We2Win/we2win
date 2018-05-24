import { TestBed, inject } from '@angular/core/testing';

import { PutDataService } from './put-data.service';

describe('PutDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PutDataService]
    });
  });

  it('should be created', inject([PutDataService], (service: PutDataService) => {
    expect(service).toBeTruthy();
  }));
});

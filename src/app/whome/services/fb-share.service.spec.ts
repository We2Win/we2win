import { TestBed, inject } from '@angular/core/testing';

import { FbShareService } from './fb-share.service';

describe('FbShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbShareService]
    });
  });

  it('should be created', inject([FbShareService], (service: FbShareService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { StressProviderService } from './stress-provider.service';

describe('StressProviderService', () => {
  let service: StressProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StressProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

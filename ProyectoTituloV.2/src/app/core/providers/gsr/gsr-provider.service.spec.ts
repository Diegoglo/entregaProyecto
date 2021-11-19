import { TestBed } from '@angular/core/testing';

import { GsrProviderService } from './gsr-provider.service';

describe('GsrProviderService', () => {
  let service: GsrProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsrProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

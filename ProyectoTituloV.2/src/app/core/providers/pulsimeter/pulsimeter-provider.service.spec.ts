import { TestBed } from '@angular/core/testing';

import { PulsimeterProviderService } from './pulsimeter-provider.service';

describe('PulsimeterProviderService', () => {
  let service: PulsimeterProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PulsimeterProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

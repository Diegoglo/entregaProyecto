import { TestBed } from '@angular/core/testing';

import { AuxilianteService } from './auxiliante.service';

describe('AuxilianteService', () => {
  let service: AuxilianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuxilianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

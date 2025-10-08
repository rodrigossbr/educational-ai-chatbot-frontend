import { TestBed } from '@angular/core/testing';

import { VlibrasService } from './vlibras.service';

describe('VlibrasService', () => {
  let service: VlibrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VlibrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

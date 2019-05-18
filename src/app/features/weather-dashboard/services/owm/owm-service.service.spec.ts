import { TestBed } from '@angular/core/testing';

import { OwmServiceService } from './owm-service.service';

describe('OwmServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwmServiceService = TestBed.get(OwmServiceService);
    expect(service).toBeTruthy();
  });
});

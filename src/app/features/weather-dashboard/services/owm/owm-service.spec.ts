import { TestBed } from '@angular/core/testing';

import { OwmService } from './owm-service';

describe('OwmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwmService = TestBed.get(OwmService);
    expect(service).toBeTruthy();
  });
});

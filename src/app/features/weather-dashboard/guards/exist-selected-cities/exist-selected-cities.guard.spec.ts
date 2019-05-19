import { TestBed, async, inject } from '@angular/core/testing';

import { ExistSelectedCitiesGuard } from './exist-selected-cities.guard';

describe('ExistSelectedCitiesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExistSelectedCitiesGuard]
    });
  });

  it('should ...', inject([ExistSelectedCitiesGuard], (guard: ExistSelectedCitiesGuard) => {
    expect(guard).toBeTruthy();
  }));
});

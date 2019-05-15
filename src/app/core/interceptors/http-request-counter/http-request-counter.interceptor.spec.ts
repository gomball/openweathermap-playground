import { TestBed } from '@angular/core/testing';
import { HttpRequestCounterInterceptor } from './http-request-counter.interceptor';

describe('HttpRequestCounterInterceptor', () => {
  let service: HttpRequestCounterInterceptor;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(HttpRequestCounterInterceptor);
    expect(service).toBeTruthy();
  });
});

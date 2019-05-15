import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let service: HttpErrorInterceptor;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(HttpErrorInterceptor);
    expect(service).toBeTruthy();
  });
});

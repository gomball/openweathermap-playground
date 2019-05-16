import { Injectable } from '@angular/core';
import { CityStore } from './city.store';

@Injectable({ providedIn: 'root' })
export class CityService {
  constructor(private readonly _store: CityStore) {}
}

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CityState, CityStore } from './city.store';

@Injectable({ providedIn: 'root' })
export class CityQuery extends Query<CityState> {
  available$ = this.select((state) => state.available);
  selected$ = this.select((state) => state.selected);

  constructor(protected store: CityStore) {
    super(store);
  }
}

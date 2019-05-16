import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { City } from '../../../domain/city';
import { CityState, CityStore } from './city.store';

@Injectable({ providedIn: 'root' })
export class CityQuery extends Query<CityState> {
  available$ = this.select((state) => state.available);
  selected$ = this.select((state) => state.selected);

  get available(): City[] {
    return this.getValue().available;
  }

  get selected(): City[] {
    return this.getValue().selected;
  }

  constructor(protected store: CityStore) {
    super(store);
  }
}

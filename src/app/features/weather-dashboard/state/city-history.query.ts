import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CityHistoryRecord, CityHistoryState, CityHistoryStore } from './city-history.store';

@Injectable({ providedIn: 'root' })
export class CityHistoryQuery extends Query<CityHistoryState> {
  constructor(protected store: CityHistoryStore) {
    super(store);
  }

  getCityHistory(cityId: number): CityHistoryRecord[] {
    return this.getValue()[cityId];
  }
}

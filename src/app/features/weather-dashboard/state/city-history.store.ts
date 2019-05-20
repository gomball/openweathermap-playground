import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { CurrentWeatherContract } from '../services/owm/owm-dto.contracts';

export interface CityHistoryRecord {
  timestamp: number;
  data: CurrentWeatherContract;
}

export interface CityHistoryState {
  [K: number]: CityHistoryRecord[];
}

export function createInitialCityHistoryState(): CityHistoryState {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cityHistory' })
export class CityHistoryStore extends Store<CityHistoryState> {
  constructor() {
    super(createInitialCityHistoryState());
  }
}

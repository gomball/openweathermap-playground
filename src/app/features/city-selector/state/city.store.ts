import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { City } from '../../../domain/city';


export interface CityState {
  available: City[];
  selected: City[];
}

export function createInitialCityState(): CityState {
  return {
    available: [],
    selected: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'city' })
export class CityStore extends Store<CityState> {
  constructor() {
    super(createInitialCityState());
  }
}

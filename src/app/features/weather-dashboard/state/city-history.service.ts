import { Injectable } from '@angular/core';
import { chain, last } from 'lodash';
import { first } from 'rxjs/operators';
import { StorageService } from '../../../core/services/storage/storage.service';
import { CityQuery } from '../../city-selector/state/city.query';
import { CurrentWeatherContract } from '../services/owm/owm-dto.contracts';
import { CityHistoryRecord, CityHistoryState, CityHistoryStore } from './city-history.store';

@Injectable({ providedIn: 'root' })
export class CityHistoryService {
  constructor(private readonly _store: CityHistoryStore, cityQuery: CityQuery, private readonly _storageService: StorageService) {
    cityQuery.available$.pipe(first()).subscribe((cities) => {
      const state: CityHistoryState = {};
      cities.forEach((c) => (state[c.id] = this._storageService.getObject<CityHistoryRecord[]>('' + c.id)));
      this._store.update(state);
    });
  }

  setData(cityId: number, data: CurrentWeatherContract): void {
    this._store.update((state) => {
      const curretHistory = state[cityId] || [];
      const lastCurrentHistoryRecordDateTime = chain(curretHistory)
        .last()
        .get('data.dateTime')
        .value();
      if (data.dateTime.isSame(lastCurrentHistoryRecordDateTime)) {
        return state;
      } else {
        const newRecord = { timestamp: new Date().getTime(), data };
        const newHistory = [...curretHistory, newRecord];
        this._storageService.setObject('' + cityId, newHistory);
        return { ...state, [cityId]: newHistory };
      }
    });
  }
}

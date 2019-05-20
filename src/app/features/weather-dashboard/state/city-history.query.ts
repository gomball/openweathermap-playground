import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { chain } from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentWeatherContract } from '../services/owm/owm-dto.contracts';
import { CityHistoryState, CityHistoryStore } from './city-history.store';

@Injectable({ providedIn: 'root' })
export class CityHistoryQuery extends Query<CityHistoryState> {
  constructor(protected store: CityHistoryStore) {
    super(store);
  }

  getCityHistory$(cityId: number): Observable<CurrentWeatherContract[]> {
    return this.select((state) => state[cityId]).pipe(
      map(
        (history) =>
          chain(history)
            .map((h) => h.data)
            .map((r) => ({ ...r, dateTime: moment(r.dateTime).toDate() }))
            .sortBy(['dateTime'])
            .reverse()
            .value() as CurrentWeatherContract[]
      )
    );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'lodash';
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../../../../domain/city';
import { CurrentWeatherContract, CurrentWeatherResponseContract, WeatherCondition } from './owm-dto.contracts';

export interface FullOwmData {
  current: CurrentWeatherContract;
  fiveDayForecast: any;
}

type OwmRequest = 'current' | 'fiveDayForecast' | 'map';

const OWM_API_URL_MAP: { [K in OwmRequest]: string } = {
  current: 'http://api.openweathermap.org/data/2.5/weather',
  fiveDayForecast: 'http://api.openweathermap.org/data/2.5/forecast',
  map: 'https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png'
};

const OWM_API_KEY = '180bf49294c9158d4f3c89691f87c1ac';

@Injectable()
export class OwmService {
  constructor(private readonly _httpClient: HttpClient) {}

  getCurrentAndFiveDayForecast$(city: City): Observable<FullOwmData> {
    return combineLatest(this.getCurrent$(city) /*this.getFiveDayForecast(city) */).pipe(
      map(([current, fiveDayForecast]) => ({ current, fiveDayForecast }))
    );
  }

  getCurrent$(city: City): Observable<CurrentWeatherContract> {
    const params = this._getHttpParams({ id: city.id });
    return this._httpClient
      .get<CurrentWeatherResponseContract>(OWM_API_URL_MAP.current, { params })
      .pipe(map((rsp) => this._mapCurrentWeatherResponse(rsp)));
  }

  getFiveDayForecast(city: City): Observable<any> {
    const params = this._getHttpParams({ id: city.id });
    return this._httpClient.get(OWM_API_URL_MAP.fiveDayForecast, { params });
  }

  private _getHttpParams(params: any): HttpParams {
    const fromObject = Object.assign(
      {
        appid: OWM_API_KEY,
        units: 'metric'
      },
      params
    );
    return new HttpParams({ fromObject });
  }

  private _mapCurrentWeatherResponse(input: CurrentWeatherResponseContract): CurrentWeatherContract {
    const output: CurrentWeatherContract = {
      atmosphere: {
        condition: get(input, 'weather[0].main') as WeatherCondition,
        pressure: get(input, 'main.pressure'),
        humidity: get(input, 'main.humidity')
      },
      temperature: {
        current: get(input, 'main.temp'),
        min: get(input, 'main.temp_min'),
        max: get(input, 'main.temp_max')
      },
      cloudiness: get(input, 'clouds.all'),
      rain: {
        lastHour: get(input, 'rain.1h'),
        lastthreeHours: get(input, 'rain.3h')
      },
      snow: {
        lastHour: get(input, 'snow.1h'),
        lastthreeHours: get(input, 'snow.3h')
      },
      wind: {
        speed: get(input, 'wind.speed'),
        deg: get(input, 'wind.deg')
      },
      dateTime: moment(get(input, 'dt') * 1000)
    };
    return output;
  }
}

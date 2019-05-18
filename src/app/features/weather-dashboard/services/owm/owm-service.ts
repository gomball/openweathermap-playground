import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppServiceLocator } from 'src/app/core/services/app-service-locator';
import { City } from '../../../../domain/city';
import { CurrentWeatherContract, CurrentWeatherResponseContract, WeatherCondition } from './owm-dto.contracts';

type OwmRequest = 'current' | 'fiveDayForecast' | 'map';

const OWM_API_URL_MAP: { [K in OwmRequest]: string } = {
  current: 'http://api.openweathermap.org/data/2.5/weather',
  fiveDayForecast: 'http://api.openweathermap.org/data/2.5/forecast',
  map: 'https://tile.openweathermap.org/map'
};

const OWM_API_KEY = '180bf49294c9158d4f3c89691f87c1ac';

@Injectable()
export class OwmService {
  private readonly _httpClient: HttpClient;

  constructor() {
    this._httpClient = AppServiceLocator.injector.get(HttpClient);
  }

  getCurrent(city: City): Observable<any> {
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
        condition: input.weather[0].main as WeatherCondition,
        pressure: input.main.pressure,
        humidity: input.main.humidity
      },
      temperature: {
        current: input.main.temp,
        min: input.main.temp_min,
        max: input.main.temp_max
      },
      cloudiness: input.clouds.all,
      rain: {
        lastHour: input.rain['1h'],
        lastthreeHours: input.rain['3h']
      },
      snow: {
        lastHour: input.snow['1h'],
        lastthreeHours: input.snow['3h']
      },
      wind: {
        speed: input.wind.speed,
        deg: input.wind.deg
      },
      dateTime: moment(input.dt)
    };
    return output;
  }
}

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { City } from '../../../../domain/city';
import { WeatherCondition, CurrentWeatherContract } from '../../services/owm/owm-dto.contracts';
import { OwmService } from '../../services/owm/owm-service';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const WEATHER_CONDITION_ICON_MAP: { [K in WeatherCondition]: string } = {
  Clear: 'weather-sunny',
  Clouds: 'weather-cloudy',
  Drizzle: 'weather-rainy',
  Rain: 'weather-pouring',
  Snow: 'weather-snowy',
  Thunderstorm: 'weather-lightning-rainy',
  Mist: 'weather-fog',
  Smoke: 'weather-fog',
  Haze: 'weather-fog',
  Dust: 'weather-fog',
  Fog: 'weather-fog',
  Sand: 'weather-fog',
  Ash: 'weather-fog',
  Squall: 'weather-fog',
  Tornado: 'weather-hurricane'
};

@Component({
  selector: 'owm-pg-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherComponent implements OnChanges {
  @Input() city: City;
  @Input() index: number;
  @Input() requestCountdown: number;
  weatherConditionIcons = WEATHER_CONDITION_ICON_MAP;

  currentWeather: CurrentWeatherContract;

  constructor(private readonly _owmService: OwmService, private readonly _cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const city = changes.city;
    if (!!city && !!city.currentValue && city.firstChange) {
      this._fetchWeatherData();
    }
    const requestCountdownChange = changes.requestCountdown;
    if (!!requestCountdownChange && requestCountdownChange.currentValue === 0) {
      this._fetchWeatherData();
    }
  }

  private _fetchWeatherData(): void {
    timer(this.index * 1000)
      .pipe(switchMap(() => this._owmService.getCurrentAndFiveDayForecast$(this.city)))
      .subscribe((data) => {
        this.currentWeather = data.current;
        this._cdr.detectChanges();
      });
  }
}

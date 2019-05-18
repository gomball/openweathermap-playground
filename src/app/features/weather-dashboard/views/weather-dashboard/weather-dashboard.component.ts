import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CityQuery } from '../../../../features/city-selector/state/city.query';

@Component({
  selector: 'owm-pg-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardComponent {
  constructor(public readonly cityQuery: CityQuery) { }
}

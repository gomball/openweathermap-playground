import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { City } from '../../../../domain/city';

@Component({
  selector: 'owm-pg-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherComponent {
  @Input() city: City;

  constructor() {}
}

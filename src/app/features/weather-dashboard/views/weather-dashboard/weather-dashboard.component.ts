import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CityQuery } from '../../../city-selector/state/city.query';

const REQUEST_DELAY_INITIAL_VALUE = 180;

@Component({
  selector: 'owm-pg-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardComponent {
  requestDelayFormControl = new FormControl(REQUEST_DELAY_INITIAL_VALUE);
  owmRequestTimer$ = this.requestDelayFormControl.valueChanges.pipe(
    startWith(this.requestDelayFormControl.value),
    switchMap((requestDelay: number) => timer(0, 1000).pipe(map((t) => this.requestDelayFormControl.value - (t % requestDelay) - 1)))
  );

  constructor(public readonly cityQuery: CityQuery) {}
}

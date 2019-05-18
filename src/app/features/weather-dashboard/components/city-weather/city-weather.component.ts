import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'owm-pg-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
